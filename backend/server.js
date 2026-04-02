require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const resourceRoutes = require('./routes/resources');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors({ 
  origin: ['http://localhost:8081', 'http://localhost:19006', 'http://127.0.0.1:8081', '*'],
  credentials: true 
}));
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/resources', resourceRoutes);

// Health check route
app.get('/', (req, res) => {
  res.json({ 
    message: 'ManamCare API running ✅',
    timestamp: new Date().toISOString(),
    status: 'healthy'
  });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.message);
  res.status(500).json({ 
    message: 'Internal server error',
    error: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Database connection and server start
const startServer = async () => {
  try {
    console.log('🔄 Connecting to MongoDB...');
    
    // MongoDB connection options
    const mongoOptions = {
      serverSelectionTimeoutMS: 5000,
      socketTimeoutMS: 45000,
      family: 4, // Force IPv4 for localhost
    };
    
    await mongoose.connect(process.env.MONGO_URI, mongoOptions);
    console.log('✅ MongoDB connected successfully');
    
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT}`);
      console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
      console.log('🎯 Ready to accept requests!');
    });

    server.on('error', (err) => {
      if (err.code === 'EADDRINUSE') {
        console.error(`❌ Port ${PORT} is already in use.`);
        console.log('💡 Try running: npx kill-port 5000');
        process.exit(1);
      } else {
        console.error('❌ Server error:', err.message);
      }
    });

    // Graceful shutdown
    process.on('SIGTERM', () => {
      console.log('🔄 SIGTERM received, shutting down gracefully');
      server.close(() => {
        mongoose.connection.close();
        process.exit(0);
      });
    });

  } catch (error) {
    console.error('❌ MongoDB Connection Failed!');
    console.error('Error:', error.message);
    console.log('\n🔧 Possible Solutions:');
    console.log('1. Check your internet connection');
    console.log('2. Whitelist your IP in MongoDB Atlas:');
    console.log('   - Go to https://cloud.mongodb.com');
    console.log('   - Navigate to Network Access');
    console.log('   - Add your current IP or use 0.0.0.0/0 for all IPs');
    console.log('3. Verify your MongoDB connection string in .env file');
    console.log('\n🚀 Starting server without database for testing...');
    
    // Start server without database for testing
    const server = app.listen(PORT, '0.0.0.0', () => {
      console.log(`🚀 Server running on http://0.0.0.0:${PORT} (No Database)`);
      console.log(`📱 API endpoints available at http://localhost:${PORT}/api`);
      console.log('⚠️  Database features will use fallback data');
    });
  }
};

startServer();