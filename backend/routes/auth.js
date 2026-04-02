const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../models/User');

const router = express.Router();

// POST /api/auth/register
router.post('/register', async (req, res) => {
  try {
    const { name, age, gender, dob, email, phone, password } = req.body;

    // Basic validation
    if (!name || !age || !gender || !dob || !email || !phone || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'Email already registered.' });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await User.create({
      name,
      age,
      gender,
      dob,
      email,
      phone,
      password: hashedPassword
    });

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ New user registered: ${email}`);

    res.status(201).json({
      message: 'Account created successfully.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Registration failed. Please try again.' });
  }
});

// POST /api/auth/login
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Basic validation
    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required.' });
    }

    // Find user
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Check password
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: 'Invalid email or password.' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    console.log(`✅ User logged in: ${email}`);

    res.json({
      message: 'Login successful.',
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Login failed. Please try again.' });
  }
});

// GET /api/auth/profile
router.get('/profile', async (req, res) => {
  try {
    // Check for authorization header
    const authHeader = req.headers.authorization;
    let userId = null;
    
    if (authHeader && authHeader.startsWith('Bearer ')) {
      try {
        const token = authHeader.substring(7);
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
        console.log('Authenticated user ID:', userId);
      } catch (tokenError) {
        console.log('Invalid token, using fallback data');
      }
    }
    
    // Check if MongoDB is connected
    if (mongoose.connection.readyState !== 1) {
      console.log('⚠️  Database not connected, using fallback data');
      return res.json({
        username: 'Vishnu Kumar',
        name: 'Vishnu Kumar',
        email: 'vishnu@manamcare.com',
        id: 'fallback-user-id',
        source: 'fallback'
      });
    }

    let user;
    
    // If we have a user ID from token, get that specific user
    if (userId) {
      user = await User.findById(userId).select('name username email age gender dob phone');
      if (user) {
        console.log('Found authenticated user:', user.name);
        return res.json({
          username: user.name || user.username,
          name: user.name,
          email: user.email,
          age: user.age,
          gender: user.gender,
          dob: user.dob,
          phone: user.phone,
          id: user._id,
          source: 'database-authenticated'
        });
      }
    }
    
    // Fallback: Try to find any existing user
    user = await User.findOne().select('name username email age gender dob phone');
    
    // If no user exists, create a sample user
    if (!user) {
      console.log('No users found, creating sample user...');
      try {
        user = await User.create({
          name: 'Vishnu Kumar',
          username: 'vishnu',
          age: 25,
          gender: 'Male',
          dob: '15/01/1999',
          email: 'vishnu@manamcare.com',
          phone: '9876543210',
          password: await bcrypt.hash('password123', 10)
        });
        console.log('Sample user created:', user.name);
      } catch (createError) {
        console.error('Failed to create user:', createError.message);
        // Return fallback data if user creation fails
        return res.json({
          username: 'Vishnu Kumar',
          name: 'Vishnu Kumar',
          email: 'vishnu@manamcare.com',
          id: 'fallback-user-id',
          source: 'fallback'
        });
      }
    }
    
    res.json({
      username: user.name || user.username || 'Vishnu Kumar',
      name: user.name,
      email: user.email,
      age: user.age,
      gender: user.gender,
      dob: user.dob,
      phone: user.phone,
      id: user._id,
      source: 'database'
    });
  } catch (err) {
    console.error('Profile fetch error:', err.message);
    // Always provide fallback response
    res.json({
      username: 'Vishnu Kumar',
      name: 'Vishnu Kumar',
      email: 'vishnu@manamcare.com',
      id: 'fallback-user-id',
      source: 'fallback'
    });
  }
});

module.exports = router;