const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files from 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// API endpoint for dashboard data
app.get('/api/status', (req, res) => {
  res.json({
    pipeline: '✅ Passing',
    lastDeployment: new Date().toLocaleString(),
    environment: process.env.NODE_ENV || 'development',
    dockerImage: `${process.env.DOCKER_USERNAME || 'blacx2'}/devops-demo:latest`,
    team: ['Your Name', 'Team Member 2', 'Team Member 3']
  });
});

// Health check
app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

// Export app for testing and for server startup
module.exports = app;