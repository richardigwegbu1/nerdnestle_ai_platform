from fastapi import FastAPI, HTTPException, Request, Header
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import os, json
from dotenv import load_dotenv

load_dotenv()

app = FastAPI(title="NerdNestle API", version="0.1.0")

origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
    "http://localhost:3000",
    "https://nerdnestle.com",
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health():
    return {"status": "ok"}

# -------- AI Generation (Stub) --------
try:
    from openai import OpenAI
except Exception:
    OpenAI = None

class GeneratePayload(BaseModel):
    product_name: str
    niche: Optional[str] = None
    tone: Optional[str] = "professional"

@app.post("/ai/generate")
def ai_generate(payload: GeneratePayload):
    """
    Returns AI-generated copy (headline, subheadline, bullet points) for a landing page.
    Replace with your preferred model & prompt style.
    """
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="OPENAI_API_KEY is not set")
    if OpenAI is None:
        raise HTTPException(status_code=500, detail="openai SDK not available on server")

    client = OpenAI(api_key=api_key)

    prompt = (
        "Create landing page copy for a single-product storefront.\n\n"
        f"Product: {payload.product_name}\n"
        f"Niche: {payload.niche or 'general business'}\n"
        f"Tone: {payload.tone}\n\n"
        "Return JSON with: headline, subheadline, bullets (3), call_to_action."
    )

    completion = client.responses.create(
        model="gpt-4o-mini",
        input=prompt,
        temperature=0.7,
    )

    text = completion.output_text
    return {"raw": text}

# -------- Products (Simple Catalog) --------
class Product(BaseModel):
    id: str
    title: str
    description: str
    price: float
    commission_pct: int

PRODUCTS = [
    Product(id="prod-001", title="AI Resume Kit", description="ATS-optimized resume + cover letter templates", price=49.0, commission_pct=80),
    Product(id="prod-002", title="DevOps Starter Pack", description="Scripts, labs, and guides", price=99.0, commission_pct=85),
    Product(id="prod-003", title="Linux Mastery Course", description="Self-paced training with labs", price=199.0, commission_pct=70),
]

@app.get("/products", response_model=List[Product])
def list_products():
    return PRODUCTS

# -------- Stripe (Skeleton) --------
try:
    import stripe
except Exception:
    stripe = None

class CheckoutPayload(BaseModel):
    product_id: str
    affiliate_account_id: Optional[str] = None  # Stripe Connect Account ID for split

@app.post("/stripe/checkout")
def create_checkout(payload: CheckoutPayload, request: Request):
    if stripe is None:
        raise HTTPException(status_code=500, detail="Stripe SDK not installed")
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe.api_key:
        raise HTTPException(status_code=400, detail="Stripe not configured")

    product = next((p for p in PRODUCTS if p.id == payload.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    origin = os.getenv("FRONTEND_URL", "http://localhost:3000")

    application_fee_amount = int(product.price * 100 * 0.15)  # 15% platform fee as example

    kwargs = dict(
        mode="payment",
        success_url=f"{origin}/success?pid={product.id}",
        cancel_url=f"{origin}/cancel",
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {"name": product.title, "description": product.description},
                "unit_amount": int(product.price * 100),
            },
            "quantity": 1,
        }],
    )

    if payload.affiliate_account_id:
        session = stripe.checkout.Session.create(
            **kwargs,
            payment_intent_data={
                "application_fee_amount": application_fee_amount,
                "transfer_data": {"destination": payload.affiliate_account_id},
            }
        )
    else:
        session = stripe.checkout.Session.create(**kwargs)

    return {"id": session.id, "url": session.url}

@app.post("/stripe/webhook")
async def stripe_webhook(request: Request, stripe_signature: Optional[str] = Header(None)):
    if stripe is None:
        raise HTTPException(status_code=500, detail="Stripe SDK not installed")
    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    webhook_secret = os.getenv("STRIPE_WEBHOOK_SECRET")
    payload = await request.body()
    try:
        if webhook_secret:
            event = stripe.Webhook.construct_event(
                payload=payload, sig_header=stripe_signature, secret=webhook_secret
            )
        else:
            event = stripe.Event.construct_from(json.loads(payload), stripe.api_key)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        # TODO: Persist order and attribute to affiliate if present
        print("Payment completed:", session.get("id"))

    return {"received": True}
