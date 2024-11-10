module.exports = {
  apps: [
    {
      name: "my-api",
      script: "./dist/server.js",
      interpreter: "ts-node",
      env: {
        NODE_ENV: "production"
      }
    }
  ]
};
