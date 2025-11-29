# routes/products.py

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import Optional
import os

router = APIRouter(prefix="/api/products", tags=["Products"])

# In a real system these would come from MongoDB.
PRODUCTS = [
    {
        "id": "prod-001",
        "slug": "ai-chat-assistant",
        "title": "AI Chat Assistant",
        "description": "Deploy an AI chatbot for your website.",
        "price": 49.0,
        "commission_pct": 80,
        "status": "available",
    },
    {
        "id": "prod-002",
        "slug": "text-to-video",
        "title": "AI Text-to-Video Generator",
        "description": "Convert text into video scenes automatically.",
        "price": 79.0,
        "commission_pct": 85,
        "status": "available",
    },
    {
        "id": "prod-003",
        "slug": "voiceover-ai",
        "title": "AI Voiceover Generator",
        "description": "Generate natural voiceovers for your videos.",
        "price": 39.0,
        "commission_pct": 75,
        "status": "available",
    },
]


# ---------------------------------------------
# LIST ALL PRODUCTS (Public)
# GET /api/products/public
# ---------------------------------------------
@router.get("/public")
async def list_products_public():
    return {"success": True, "products": PRODUCTS}


# ---------------------------------------------
# GET ONE PRODUCT (Public)
# GET /api/products/public/{slug}
# ---------------------------------------------
@router.get("/public/{slug}")
async def get_product_public(slug: str):
    for p in PRODUCTS:
        if p["slug"] == slug:
            return {"success": True, "product": p}

    raise HTTPException(status_code=404, detail="Tool not found")

