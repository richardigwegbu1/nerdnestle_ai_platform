module.exports = {
  apps: [
    {
      name: "frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      cwd: "/home/ec2-user/nerdnest_ai_platform/frontend",
      env: {
        NODE_ENV: "production",
      }
    }
  ]
}

