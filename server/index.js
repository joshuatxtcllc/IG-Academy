/**
 * SocialGuardian API Server
 * Main entry point for the backend application
 */

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/socialguardian', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connection established'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Middleware
app.use(helmet()); // Security headers
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON requests
app.use(morgan('dev')); // Request logging

// Rate limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again after 15 minutes'
});
app.use('/api/', apiLimiter);

// Import routes
const authRoutes = require('./routes/authRoutes');
const accountsRoutes = require('./routes/accountsRoutes');
const contentRoutes = require('./routes/contentRoutes');
const analyticsRoutes = require('./routes/analyticsRoutes');
const guardianRoutes = require('./routes/guardianRoutes');
const aiRoutes = require('./routes/aiRoutes');
const campaignsRoutes = require('./routes/campaignsRoutes');
const influencerRoutes = require('./routes/influencerRoutes');

// Use routes
app.use('/api/auth', authRoutes);
app.use('/api/accounts', accountsRoutes);
app.use('/api/content', contentRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/protection', guardianRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api/campaigns', campaignsRoutes);
app.use('/api/influencers', influencerRoutes);

// Root route
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to SocialGuardian API' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Internal Server Error';
  
  res.status(statusCode).json({
    error: {
      code: err.code || 'server_error',
      message,
      details: process.env.NODE_ENV === 'development' ? err.stack : undefined
    },
    requestId: req.id
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app; // For testing purposes
