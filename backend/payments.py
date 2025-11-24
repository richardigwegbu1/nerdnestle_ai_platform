# payments.py
from fastapi import APIRouter, Request
import stripe

router = APIRouter()

# ⚠️ Replace this with your actual Stripe secret key
stripe.api_key = "sk_test_51SPczVBDSvwyUGJelTx0FmdjFpYVJexqFI4dxpvDVfOO6lprikHhhuA3Elq9RIt2QDGK4jNiyOpCGG7WEVgP4aMS00xEmHbcAe"

@router.post("/create-checkout-session")
async def create_checkout_session(request: Request):
    data = await request.json()
    price_id = data.get("priceId")

    try:
        session = stripe.checkout.Session.create(
            payment_method_types=["card"],
            line_items=[{"price": price_id, "quantity": 1}],
            mode="payment",
            success_url="https://nerdnestle.com/success.html",
            cancel_url="https://nerdnestle.com/products.html",
        )
        return {"id": session.id}
    except Exception as e:
        return {"error": str(e)}

