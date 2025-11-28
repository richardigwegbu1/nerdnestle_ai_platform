module.exports = {
  apps: [
    {
      name: "nerdnest-backend",
      cwd: "/home/ec2-user/nerdnest_ai_platform/backend",
      script: "/home/ec2-user/nerdnest_ai_platform/backend/.venv/bin/gunicorn",
      args: "main:app -w 4 -k uvicorn.workers.UvicornWorker -b 127.0.0.1:8000",

      // IMPORTANT: Prevent PM2 from using Node.js
      interpreter: "none",

      // Ensure PM2 loads correct environment
      env: {
        PATH: "/home/ec2-user/nerdnest_ai_platform/backend/.venv/bin:/usr/local/bin:/usr/bin:/bin",
        PYTHONPATH: "/home/ec2-user/nerdnest_ai_platform/backend",
        ENVIRONMENT: "production"
      }
    }
  ]
};

