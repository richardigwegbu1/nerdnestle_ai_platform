# routes/storefront.py

from fastapi import APIRouter, HTTPException, Depends, Header
from pydantic import BaseModel
from typing import List, Optional
from uuid import uuid4
from datetime import datetime
import os
import jwt
from bson import ObjectId

from main import db

router = APIRouter(prefix="/api/storefront", tags=["Storefront"])

JWT_SECRET = os.getenv("JWT_SECRET", "dev-secret-key")

# ---------------------------------------------------------
# TOKEN VERIFICATION (for private routes)
# ---------------------------------------------------------
def verify_token(authorization: str = Header(None)):
    if not authorization:
        raise HTTPException(status_code=401, detail="Missing Authorization header")

    if not authorization.startswith("Bearer "):
        raise HTTPException(status_code=401, detail="Invalid Authorization header")

    token = authorization.split(" ")[1]

    try:
        data = jwt.decode(token, JWT_SECRET, algorithms=["HS256"])
        return data  # contains: user_id
    except Exception:
        raise HTTPException(status_code=401, detail="Invalid or expired token")


# ---------------------------------------------------------
# REQUEST MODEL FOR CREATION
# ---------------------------------------------------------
class StorefrontRequest(BaseModel):
    brand: str
    tools: List[str]
    theme: Optional[str] = "modern"


# ---------------------------------------------------------
# SERIALIZER FOR MONGODB DOCUMENTS
# ---------------------------------------------------------
def serialize_storefront(doc):
    return {
        "id": doc.get("id"),
        "_id": str(doc.get("_id")),
        "user_id": doc.get("user_id"),
        "brand": doc.get("brand"),
        "tools": doc.get("tools", []),
        "theme": doc.get("theme"),
        "created_at": doc.get("created_at"),
    }


# ---------------------------------------------------------
# CREATE STOREFRONT
# POST /api/storefront/create
# ---------------------------------------------------------
@router.post("/create")
async def create_storefront(payload: StorefrontRequest, user=Depends(verify_token)):
    collection = db["storefronts"]

    doc = {
        "id": str(uuid4()),
        "user_id": user["user_id"],
        "brand": payload.brand,
        "tools": payload.tools,
        "theme": payload.theme,
        "created_at": datetime.utcnow().isoformat(),
    }

    result = await collection.insert_one(doc)
    doc["_id"] = str(result.inserted_id)

    return {"success": True, "storefront": serialize_storefront(doc)}


# ---------------------------------------------------------
# LIST ALL STOREFRONTS FOR USER
# GET /api/storefront/list
# ---------------------------------------------------------
@router.get("/list")
async def list_storefronts(user=Depends(verify_token)):
    collection = db["storefronts"]
    cursor = collection.find({"user_id": user["user_id"]})

    storefronts = []
    async for item in cursor:
        storefronts.append(serialize_storefront(item))

    return {"success": True, "storefronts": storefronts}


# ---------------------------------------------------------
# GET ONE PRIVATE STOREFRONT (requires login)
# GET /api/storefront/{storefront_id}
# ---------------------------------------------------------
@router.get("/{storefront_id}")
async def get_storefront(storefront_id: str, user=Depends(verify_token)):
    collection = db["storefronts"]
    doc = await collection.find_one({"id": storefront_id, "user_id": user["user_id"]})

    if not doc:
        raise HTTPException(status_code=404, detail="Storefront not found")

    return {"success": True, "storefront": serialize_storefront(doc)}


# ---------------------------------------------------------
# PUBLIC STOREFRONT (NO LOGIN REQUIRED)
# GET /api/storefront/public/{storefront_id}
# ---------------------------------------------------------
@router.get("/public/{storefront_id}")
async def get_storefront_public(storefront_id: str):
    collection = db["storefronts"]

    doc = await collection.find_one({"id": storefront_id})

    if not doc:
        raise HTTPException(status_code=404, detail="Storefront not found")

    return serialize_storefront(doc)

