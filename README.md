# NerdNestle — Allen.store-Style AI Business Platform

This repo contains a **production-ready skeleton** for building an AI-powered affiliate storefront platform like *Allen.store*.

- **Frontend:** Next.js 14 (pages router) — `frontend/`
- **Backend:** FastAPI + Gunicorn — `backend/`
- **Domain:** `nerdnestle.com` (frontend) and `api.nerdnestle.com` (backend)
- **Payments:** Stripe Connect (skeleton)
- **AI:** OpenAI API (skeleton)

---

## Quick Deploy on AWS EC2 (Amazon Linux 2)

### 1) Install dependencies
```bash
sudo yum update -y
sudo yum install -y git nginx python3-pip
curl -fsSL https://rpm.nodesource.com/setup_20.x | sudo -E bash -
sudo yum install -y nodejs
```

### 2) Copy/Clone
```bash
cd ~
# If you downloaded a ZIP, upload and unzip here as nerdnestle_ai_platform
```

### 3) Backend
```bash
cd ~/nerdnestle_ai_platform/backend
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # fill keys
# test:
uvicorn main:app --host 0.0.0.0 --port 8000
```

### 4) Systemd + Nginx
```bash
sudo cp deploy/nerdnestle-api.service /etc/systemd/system/
sudo systemctl daemon-reload
sudo systemctl enable nerdnestle-api
sudo systemctl start nerdnestle-api

sudo cp deploy/nginx.api.conf /etc/nginx/conf.d/nerdnestle.api.conf
sudo systemctl restart nginx
```

### 5) SSL (Let's Encrypt)
```bash
sudo amazon-linux-extras install epel -y
sudo yum install -y certbot python3-certbot-nginx
sudo certbot --nginx -d api.nerdnestle.com
```

### 6) Frontend
```bash
cd ~/nerdnestle_ai_platform/frontend
cp .env.local.example .env.local   # set NEXT_PUBLIC_API_BASE and Stripe public key
npm install
npm run build
npm start -p 3000 &
```

(Optional) Add an Nginx server block to reverse proxy `nerdnestle.com` to `127.0.0.1:3000`.

---

## Next Steps
- Wire real DB (RDS Postgres or Supabase) and persist orders/users.
- Implement auth (NextAuth or JWT).
- Flesh out Stripe Connect onboarding and dashboard reports.
- Replace AI stub with robust prompts & JSON parsing.
- Add admin panel for products and affiliates.

Happy building! 🚀
