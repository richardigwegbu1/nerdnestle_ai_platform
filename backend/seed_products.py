#!/usr/bin/env python3
"""
Seed initial AI product catalog for NerdNestle MVP
Author: Richard Igwegbu (Unix Training Academy / NerdNestle)
"""

import os
from dotenv import load_dotenv
from sqlalchemy.orm import Session
from database import SessionLocal
from models import Product

# Load environment variables
load_dotenv()

# Define your initial product catalog
products = [
    {
        "title": "AI Resume Analyzer",
        "description": "Upload your resume and get instant ATS feedback and optimization tips.",
        "price": 29.00,
        "commission_pct": 10,
    },
    {
        "title": "AI Chat Assistant",
        "description": "Personalized GPT-powered chatbot for small businesses and freelancers.",
        "price": 49.00,
        "commission_pct": 15,
    },
    {
        "title": "AI Voice Receptionist",
        "description": "Smart phone assistant that answers, transcribes, and replies to customer calls.",
        "price": 99.00,
        "commission_pct": 20,
    },
    {
        "title": "AI Blog Writer",
        "description": "Generate SEO-optimized blog posts tailored to your brand tone in seconds.",
        "price": 39.00,
        "commission_pct": 10,
    },
    {
        "title": "AI Video Script Generator",
        "description": "Create YouTube or ad scripts that convert, based on your idea or keyword.",
        "price": 45.00,
        "commission_pct": 12,
    },
    {
        "title": "AI Product Description Generator",
        "description": "Generate high-converting product listings for Shopify, Etsy, or Amazon stores.",
        "price": 25.00,
        "commission_pct": 8,
    },
]

def seed_products():
    db: Session = SessionLocal()
    try:
        for p in products:
            existing = db.query(Product).filter_by(title=p["title"]).first()
            if existing:
                print(f"✅ Skipping existing product: {p['title']}")
                continue

            new_product = Product(**p)
            db.add(new_product)
            print(f"➕ Added: {p['title']} (${p['price']})")

        db.commit()
        print("\n🎉 Seeding complete.")
    except Exception as e:
        print("❌ Error seeding products:", e)
    finally:
        db.close()

if __name__ == "__main__":
    seed_products()

