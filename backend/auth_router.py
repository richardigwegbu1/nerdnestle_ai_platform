# auth_router.py

import os
import jwt
import random
from datetime import datetime, timedelta

from fastapi import APIRouter, HTTPException, Depends
from fastapi.security import OAuth2PasswordRequestForm
from dotenv import load_dotenv
from pydantic import BaseModel

from database import get_db
from models import User
from contact_router import send_email

load_dotenv()

router = APIRouter(prefix="/auth", tags=["Authentication"])

JWT_SECRET = os.getenv("JWT_SECRET", "default_secret_key")
JWT_ALGORITHM = "HS256"
JWT_EXPIRE_MINUTES = 60 * 24 * 7  # 7 days


class SignupModel(BaseModel):
    email: str


def create_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=JWT_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, JWT_SECRET, algorithm=JWT_ALGORITHM)


@router.post("/signup")
def signup(payload: SignupModel, db=Depends(get_db)):
    """
    Magic code signup.
    - Creates user record if not exists.
    - Generates a 6-digit code.
    - Emails the code to the user.
    """
    email = payload.email.lower().strip()

    user = db.query(User).filter(User.email == email).first()
    if not user:
        # placeholder code; will be overwritten below
        user = User(email=email, code="000000")
        db.add(user)
        db.commit()
        db.refresh(user)

    # Generate 6-digit numeric code
    code = str(random.randint(100000, 999999))
    user.code = code
    db.commit()

    subject = "Your NerdNest AI Login Code"
    body = f"""
Hello,

Your login code for NerdNest AI is:

🔐 CODE: {code}

This code expires in 10 minutes.

If you did not request this, please ignore.

— NerdNest AI Platform
"""

    try:
        send_email(
            to_email=email,
            subject=subject,
            body=body,
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to send email: {e}")

    return {"message": "Login code sent", "email": email}


@router.post("/verify-code")
def verify_code(email: str, code: str, db=Depends(get_db)):
    """
    Verifies the login code and returns a JWT if valid.
    """
    email = email.lower().strip()
    user = db.query(User).filter(User.email == email).first()

    if not user:
        raise HTTPException(status_code=400, detail="User not found")

    if user.code != code:
        raise HTTPException(status_code=400, detail="Invalid code")

    token = create_token({"email": email})

    # Clear the code after successful login
    user.code = None
    db.commit()

    return {"token": token, "email": email}


@router.post("/login")
def login(form: OAuth2PasswordRequestForm = Depends(), db=Depends(get_db)):
    """
    Optional traditional email/password login.
    """
    email = form.username.lower().strip()
    password = form.password

    user = db.query(User).filter(User.email == email).first()
    if not user:
        raise HTTPException(status_code=400, detail="Invalid credentials")

    if not user.verify_password(password):
        raise HTTPException(status_code=400, detail="Invalid credentials")

    token = create_token({"email": email})
    return {"token": token, "email": email}

