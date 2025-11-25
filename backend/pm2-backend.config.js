module.exports = {
  apps: [
    {
      name: "nerdnest-backend",
      script: "/home/ec2-user/nerdnest_ai_platform/backend/.venv/bin/uvicorn",
      args: "main:app --host 0.0.0.0 --port 8000",
      interpreter: "none",
      cwd: "/home/ec2-user/nerdnest_ai_platform/backend",
      env: {
        PYTHONPATH: "/home/ec2-user/nerdnest_ai_platform/backend",
      }
    }
  ]
};

