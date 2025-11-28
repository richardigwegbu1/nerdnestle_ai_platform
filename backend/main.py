from fastapi import FastAPI, HTTPException, Request, Header, Depends
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, EmailStr
from typing import List, Optional
from datetime import datetime
import os, json
from dotenv import load_dotenv

# ============================================
# Load environment
# ============================================
load_dotenv()

# ============================================
# Initialize App
# ============================================
app = FastAPI(title="NerdNest API", version="1.0.0")

# ============================================
# CORS
# ============================================
origins = [
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
    "http://localhost:3000",
    "https://nerdnest.ai",
    "https://www.nerdnest.ai",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ============================================
# DEBUG ENDPOINT (NEW)
# ============================================
@app.get("/debug/headers")
async def debug_headers(request: Request):
    return {"received_headers": dict(request.headers)}


# ============================================
# Health
# ============================================
@app.get("/health")
def health():
    return {"status": "ok"}


# ============================================
# MongoDB Setup
# ============================================
from motor.motor_asyncio import AsyncIOMotorClient

MONGO_URL = os.getenv("MONGO_URL")
if not MONGO_URL:
    raise Exception("❌ MONGO_URL is missing in .env file")

mongo_client = AsyncIOMotorClient(MONGO_URL)
db = mongo_client["nerdnest"]


# ============================================
# AUTH UTILITIES
# ============================================
from passlib.context import CryptContext
from jose import jwt, JWTError

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = os.getenv("JWT_SECRET", "CHANGE_ME_TO_A_LONG_RANDOM_SECRET")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24


def hash_password(password: str):
    return pwd_context.hash(password)


def verify_password(plain: str, hashed: str):
    return pwd_context.verify(plain, hashed)


def create_access_token(data: dict):
    return jwt.encode(data, SECRET_KEY, algorithm=ALGORITHM)


# ============================================
# USER MODELS
# ============================================
class UserCreate(BaseModel):
    email: EmailStr
    password: str


class UserLogin(BaseModel):
    email: EmailStr
    password: str


# ============================================
# SIGNUP
# ============================================
@app.post("/api/auth/signup")
async def signup(user: UserCreate):
    users = db["users"]

    existing = await users.find_one({"email": user.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email already exists")

    hashed = hash_password(user.password)

    record = {
        "email": user.email,
        "password": hashed,
        "created_at": datetime.utcnow(),
    }

    result = await users.insert_one(record)

    return {
        "success": True,
        "user": {
            "id": str(result.inserted_id),
            "email": user.email,
        },
    }


# ============================================
# LOGIN
# ============================================
@app.post("/api/auth/login")
async def login(user: UserLogin):
    users = db["users"]

    found = await users.find_one({"email": user.email})
    if not found:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not verify_password(user.password, found["password"]):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_access_token({"user_id": str(found["_id"])})

    return {
        "success": True,
        "access_token": token,
        "user": {
            "id": str(found["_id"]),
            "email": found["email"],
        },
    }


# ============================================
# AUTH DEPENDENCY FIX (Handles Authorization header)
# ============================================
async def get_current_user(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid token format")

    token = authorization.split("Bearer ")[1]

    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="Invalid token")

    return payload  # contains user_id


# ============================================
# STORE FRONT ROUTER
# ============================================
from routes.storefront import router as storefront_router
app.include_router(storefront_router)


# ============================================
# Protected Storefront Endpoint (TEST)
# ============================================
@app.get("/api/storefront/list")
async def storefront_list(user=Depends(get_current_user)):
    return {"message": "Auth success!", "user": user}


# ============================================
# AI GENERATION API
# ============================================
try:
    from openai import OpenAI
except:
    OpenAI = None


class GeneratePayload(BaseModel):
    product_name: str
    niche: Optional[str] = None
    tone: Optional[str] = "professional"


@app.post("/ai/generate")
def ai_generate(payload: GeneratePayload):
    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        raise HTTPException(status_code=400, detail="OPENAI_API_KEY not set")
    if OpenAI is None:
        raise HTTPException(status_code=500, detail="OpenAI SDK missing")

    client = OpenAI(api_key=api_key)

    prompt = (
        "Create landing page copy for a single-product storefront.\n\n"
        f"Product: {payload.product_name}\n"
        f"Niche: {payload.niche or 'general'}\n"
        f"Tone: {payload.tone}\n\n"
        "Return JSON with: headline, subheadline, bullets (3), call_to_action."
    )

    completion = client.responses.create(
        model="gpt-4o-mini",
        input=prompt,
        temperature=0.7,
    )

    return {"raw": completion.output_text}


# ============================================
# PRODUCT CATALOG
# ============================================
class Product(BaseModel):
    id: str
    slug: str
    title: str
    description: str
    price: float
    commission_pct: int


PRODUCTS = [
    {
        "id": "prod-001",
        "slug": "ai-chat-assistant",
        "title": "AI Chat Assistant",
        "description": "Deploy an AI chatbot for your website.",
        "price": 49.0,
        "commission_pct": 80,
    },
    {
        "id": "prod-002",
        "slug": "ai-customer-support-assistant",
        "title": "AI Customer Support Assistant",
        "description": "AI-powered support trained on your data.",
        "price": 99.0,
        "commission_pct": 85,
    },
    {
        "id": "prod-003",
        "slug": "ai-resume-analyzer",
        "title": "AI Resume Analyzer",
        "description": "ATS scoring & job matching.",
        "price": 69.0,
        "commission_pct": 75,
    },
]


@app.get("/api/products")
def list_products():
    return PRODUCTS


@app.get("/api/products/{slug}")
def get_product(slug: str):
    for p in PRODUCTS:
        if p["slug"] == slug:
            return p
    raise HTTPException(status_code=404, detail="Product not found")


# ============================================
# STRIPE
# ============================================
try:
    import stripe
except:
    stripe = None


class CheckoutPayload(BaseModel):
    product_id: str
    affiliate_account_id: Optional[str] = None


@app.post("/stripe/checkout")
def stripe_checkout(payload: CheckoutPayload, request: Request):
    if stripe is None:
        raise HTTPException(status_code=500, detail="Stripe SDK missing")

    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")

    product = next((p for p in PRODUCTS if p["id"] == payload.product_id), None)
    if not product:
        raise HTTPException(status_code=404, detail="Product not found")

    origin = os.getenv("FRONTEND_URL", "http://localhost:3000")

    session = stripe.checkout.Session.create(
        mode="payment",
        success_url=f"{origin}/success?pid={product['id']}",
        cancel_url=f"{origin}/cancel",
        line_items=[
            {
                "price_data": {
                    "currency": "usd",
                    "product_data": {
                        "name": product["title"],
                        "description": product["description"],
                    },
                    "unit_amount": int(product["price"] * 100),
                },
                "quantity": 1,
            }
        ],
    )

    return {"id": session.id, "url": session.url}


@app.post("/stripe/webhook")
async def stripe_webhook(request: Request, stripe_signature: Optional[str] = Header(None)):
    if stripe is None:
        raise HTTPException(status_code=500, detail="Stripe SDK missing")

    stripe.api_key = os.getenv("STRIPE_SECRET_KEY")
    payload = await request.body()

    try:
        event = stripe.Event.construct_from(json.loads(payload), stripe.api_key)
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

    if event["type"] == "checkout.session.completed":
        session = event["data"]["object"]
        print("Payment completed:", session.get("id"))

    return {"received": True}

