# contact_router.py
import os
import smtplib
import ssl
from fastapi import APIRouter, Form
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from dotenv import load_dotenv

load_dotenv()

router = APIRouter(prefix="/contact", tags=["Contact"])


def send_email(to_email: str, subject: str, body: str):
    """
    Shared helper used by:
      - /contact endpoint
      - auth_router (for magic login codes)
    """
    smtp_server = os.getenv("SMTP_SERVER")
    smtp_port = int(os.getenv("SMTP_PORT", 465))
    smtp_user = os.getenv("SMTP_USER")
    smtp_password = os.getenv("SMTP_PASSWORD")

    if not all([smtp_server, smtp_port, smtp_user, smtp_password]):
        raise RuntimeError("SMTP environment variables are not fully configured")

    msg = MIMEMultipart()

    # ✅ This makes emails read: "Nerd Nest AI <help@nerdnest.ai>"
    msg["From"] = f"Nerd Nest AI <{smtp_user}>"

    msg["To"] = to_email
    msg["Subject"] = subject
    msg.attach(MIMEText(body, "plain"))

    context = ssl.create_default_context()
    with smtplib.SMTP_SSL(smtp_server, smtp_port, context=context) as server:
        server.login(smtp_user, smtp_password)
        server.send_message(msg)


@router.post("/")
async def contact(
    name: str = Form(...),
    email: str = Form(...),
    phone: str = Form(...),
    message: str = Form(...),
):
    """
    Contact form endpoint from NerdNest AI frontend.
    Sends an email to the site owner (SMTP_USER) with the details.
    """
    smtp_user = os.getenv("SMTP_USER")
    if not smtp_user:
        return {
            "status": "error",
            "message": "SMTP_USER not configured on server",
        }

    subject = f"📬 New Contact Message from {name}"
    body = f"""
You have received a new message from the Nerd Nest AI website contact form.

👤 Name: {name}
📧 Email: {email}
📞 Phone: {phone}

💬 Message:
{message}

---------------------------------
Sent automatically from https://nerdnest.ai/contact
"""

    try:
        send_email(to_email=smtp_user, subject=subject, body=body)
        return {"status": "success", "message": "✅ Email sent successfully"}
    except Exception as e:
        print("❌ Error sending email:", e)
        return {"status": "error", "message": f"Failed to send: {e}"}

