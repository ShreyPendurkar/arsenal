import express from 'express';
import cors from 'cors';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key-change-in-production';

// Middleware
app.use(cors());
app.use(express.json());

// In-memory storage (arrays)
let users = [];
let contacts = [];

// JWT helper functions
const generateToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
};

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
};

// Authentication middleware
const authenticate = (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ success: false, message: 'No token provided' });
  }

  const decoded = verifyToken(token);
  if (!decoded) {
    return res.status(401).json({ success: false, message: 'Invalid or expired token' });
  }

  req.user = decoded;
  next();
};

// ==================== AUTHENTICATION ROUTES ====================

// POST /api/auth/register - Register a new user
app.post('/api/auth/register', (req, res) => {
  const { username, password, role } = req.body;

  if (!username || !password || !role) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username, password, and role are required' 
    });
  }

  // Check if user already exists
  const existingUser = users.find(u => u.username === username);
  if (existingUser) {
    return res.status(409).json({ 
      success: false, 
      message: 'Username already exists' 
    });
  }

  // Create new user
  const newUser = {
    id: Date.now().toString(),
    username,
    password, // In production, hash this password
    role,
    createdAt: new Date().toISOString()
  };

  users.push(newUser);

  // Generate JWT token
  const token = generateToken({ 
    id: newUser.id, 
    username: newUser.username, 
    role: newUser.role 
  });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    token,
    user: {
      id: newUser.id,
      username: newUser.username,
      role: newUser.role
    }
  });
});

// POST /api/auth/login - Login user
app.post('/api/auth/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({ 
      success: false, 
      message: 'Username and password are required' 
    });
  }

  // Find user
  const user = users.find(u => u.username === username && u.password === password);
  
  if (!user) {
    return res.status(401).json({ 
      success: false, 
      message: 'Invalid credentials' 
    });
  }

  // Generate JWT token
  const token = generateToken({ 
    id: user.id, 
    username: user.username, 
    role: user.role 
  });

  res.json({
    success: true,
    message: 'Login successful',
    token,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// GET /api/auth/me - Get current user (protected)
app.get('/api/auth/me', authenticate, (req, res) => {
  const user = users.find(u => u.id === req.user.id);
  
  if (!user) {
    return res.status(404).json({ 
      success: false, 
      message: 'User not found' 
    });
  }

  res.json({
    success: true,
    user: {
      id: user.id,
      username: user.username,
      role: user.role
    }
  });
});

// ==================== CONTACT ROUTES ====================

// POST /api/contacts - Submit contact form (protected)
app.post('/api/contacts', authenticate, (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ 
      success: false, 
      message: 'All fields are required' 
    });
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({ 
      success: false, 
      message: 'Invalid email format' 
    });
  }

  const newContact = {
    id: Date.now().toString(),
    name,
    email,
    subject,
    message,
    userId: req.user.id,
    createdAt: new Date().toISOString()
  };

  contacts.push(newContact);

  res.status(201).json({
    success: true,
    message: 'Contact form submitted successfully',
    contact: {
      id: newContact.id,
      name: newContact.name,
      email: newContact.email,
      subject: newContact.subject,
      createdAt: newContact.createdAt
    }
  });
});

// GET /api/contacts - Get all contacts (protected)
app.get('/api/contacts', authenticate, (req, res) => {
  // In a real app, you might want to filter by user role
  // For now, return all contacts
  const contactsList = contacts.map(contact => ({
    id: contact.id,
    name: contact.name,
    email: contact.email,
    subject: contact.subject,
    message: contact.message,
    createdAt: contact.createdAt
  }));

  res.json({
    success: true,
    contacts: contactsList,
    count: contactsList.length
  });
});

// GET /api/contacts/:id - Get single contact (protected)
app.get('/api/contacts/:id', authenticate, (req, res) => {
  const contact = contacts.find(c => c.id === req.params.id);

  if (!contact) {
    return res.status(404).json({ 
      success: false, 
      message: 'Contact not found' 
    });
  }

  res.json({
    success: true,
    contact: {
      id: contact.id,
      name: contact.name,
      email: contact.email,
      subject: contact.subject,
      message: contact.message,
      createdAt: contact.createdAt
    }
  });
});

// ==================== HEALTH CHECK ====================

app.get('/api/health', (req, res) => {
  res.json({ 
    success: true, 
    message: 'Server is running',
    timestamp: new Date().toISOString()
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
  console.log(`📝 API Documentation:`);
  console.log(`   POST   /api/auth/register - Register new user`);
  console.log(`   POST   /api/auth/login - Login user`);
  console.log(`   GET    /api/auth/me - Get current user (requires token)`);
  console.log(`   POST   /api/contacts - Submit contact form (requires token)`);
  console.log(`   GET    /api/contacts - Get all contacts (requires token)`);
  console.log(`   GET    /api/contacts/:id - Get single contact (requires token)`);
  console.log(`   GET    /api/health - Health check`);
});

