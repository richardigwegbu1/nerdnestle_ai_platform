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
    "https://nerdnest.ai",
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


# ============================================================
#               AI GENERATION (STUB)
# ============================================================

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
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="OPENAI_API_KEY is not set")
    if OpenAI is None:
        raise HTTPException(status_code=500, detail="openai SDK not available")

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

    return {"raw": completion.output_text}


# ============================================================
#                  PRODUCT CATALOG (UPDATED)
# ============================================================

class Product(BaseModel):
    id: str
    slug: str
    title: str
    description: str
    price: float
    commission_pct: int

PRODUCTS: List[dict] = [
    {
        "id": "prod-001",
        "slug": "ai-chat-assistant",
        "title": "AI Chat Assistant",
        "description": "Deploy a customizable AI chatbot for your website.",
        "price": 49.0,
        "commission_pct": 80
    },
    {
        "id": "prod-002",
        "slug": "ai-customer-support-assistant",
        "title": "AI Customer Support Assistant",
        "description": "Automated customer support trained on your data.",
        "price": 99.0,
        "commission_pct": 85
    },
    {
        "id": "prod-003",
        "slug": "ai-resume-analyzer",
        "title": "AI Resume Analyzer",
        "description": "Smart ATS resume scoring & job matching.",
        "price": 69.0,
        "commission_pct": 75
    }
]

# --- API used by the frontend ---
@app.get("/api/products")
def api_list_products():
    return PRODUCTS

@app.get("/api/products/{slug}")
def api_get_product(slug: str):
    for product in PRODUCTS:
        if product["slug"] == slug:
            return product
    raise HTTPException(status_code=404, detail="Product not found")


# ============================================================
#                  STRIPE CHECKOUT
# ============================================================

try:
    import stripe
except Exception:
    stripe = None

class CheckoutPayload(BaseModel):
    product_id: str
    affiliate_account_id: Optional[str] = None

@app.post("/stripe/checkout")
def create_checkout(payload: CheckoutPayload, request: Request):
    if stripe is None:
        raise HTTPException(status_code=500, detail="Stripe SDK not installed")

    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    if not stripe.api_key:
        raise HTTPException(status_code=400, detail="Stripe not configured")

    product = next((p for p in PRODUCTS if p["id"] == payload.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    origin = os.getenv("FRONTEND_URL", "http://localhost:3000")

    application_fee_amount = int(product["price"] * 100 * 0.15)

    kwargs = dict(
        mode="payment",
        success_url=f"{origin}/success?pid={product['id']}",
        cancel_url=f"{origin}/cancel",
        line_items=[{
            "price_data": {
                "currency": "usd",
                "product_data": {
                    "name": product["title"],
                    "description": product["description"]
                },
                "unit_amount": int(product["price"] * 100),
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
        print("Payment completed:", session.get("id"))

    return {"received": True}

