# auth_router.py

import os
import jwt
import random
from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Depends, Form
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
from pydantic import BaseModel

from database import get_db
from models import User
from contact_router import send_email

load_dotenv()

router = APIRouter(prefix="/api/auth", tags=["Authentication"])

JWT_SECRET = os.getenv("JWT_SECRET", "default_secret_key")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


def create_token(user):
    """Generate JWT with user_id + email"""
    payload = {
        "user_id": str(user.id),
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES),
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)


class SignupModel(BaseModel):
    email: str


@router.post("/signup")
def signup(payload: SignupModel, db=Depends(get_db)):
    email = payload.email.lower().strip()

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, code="000000")
        db.add(user)
        db.commit()
        db.refresh(user)

    code = str(random.randint(100000, 999999))
    user.code = code
    db.commit()

    subject = "Your NerdNest AI Login Code"
    body = f"""
Hello,

Your NerdNest AI login code is:

🔐 CODE: {code}

This code expires in 10 minutes.
"""

    send_email(to_email=email, subject=subject, body=body)

    return {"message": "Login code sent", "email": email}


@router.post("/verify-code")
def verify_code(email: str = Form(...), code: str = Form(...), db=Depends(get_db)):
    email = email.lower().strip()
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if user.code != code:
        raise HTTPException(status_code=400, detail="Invalid code")

    token = create_token(user)

    user.code = None
    db.commit()

    return {"token": token, "email": email}


@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    email = form.username.lower().strip()
    password = form.password

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not user.verify_password(password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token(user)
    return {"token": token, "email": email}

