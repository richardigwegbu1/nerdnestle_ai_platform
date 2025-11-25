module.exports = {
  apps: [
    {
      name: "nerdnest-frontend",
      cwd: "/home/ec2-user/nerdnest_ai_platform/frontend",
      script: "node_modules/next/dist/bin/next",
      args: "start -p 3000",
      watch: false,
      env: {
        NODE_ENV: "production"
      }
    }
  ]
}

