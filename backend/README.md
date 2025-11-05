# NerdNestle AI Platform — Backend (FastAPI)

This is the FastAPI backend for **nerdnestle.com**. It provides APIs for:
- Auth (stubbed)
- Products (catalog)
- AI generation (GPT)
- Stripe Connect (webhooks + checkout session)
- Users (dashboard data, stubbed)

## Quick Start (Local)

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env  # Fill in keys
uvicorn main:app --reload
```

Open http://127.0.0.1:8000/docs

## Production (EC2)
- Use **gunicorn** with the Uvicorn worker behind **Nginx**.
- See `deploy/` for Nginx and systemd service examples.
