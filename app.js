// Move all module imports to top level (fixes lazy loading issue)
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

// Main route
app.get("/", (req, res) => {
  res.send("Hello from containerized app!");
});

// Health check endpoint for CI/CD deployment verification
app.get("/health", (req, res) => {
  res.status(200).json({ status: "healthy", timestamp: new Date().toISOString() });
});

// Proper error handling for server startup (fixes high severity issue)
app.listen(port, (err) => {
  if (err) {
    console.error(`Failed to start server: ${err.message}`);
    process.exit(1);
  }
  console.log(`Server running on port ${port}`);
});

// Graceful shutdown handling for CI/CD deployments
process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully');
  process.exit(0);
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully');
  process.exit(0);
});
