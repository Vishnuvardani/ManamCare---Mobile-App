const validator = require('validator');

// Validation helper functions
const isValidName = (name) => {
  return name && 
         typeof name === 'string' && 
         name.trim().length >= 2 && 
         name.trim().length <= 50 &&
         /^[a-zA-Z\s]+$/.test(name.trim());
};

const isValidAge = (age) => {
  const numAge = Number(age);
  return !isNaN(numAge) && numAge >= 13 && numAge <= 120;
};

const isValidGender = (gender) => {
  const validGenders = ['Male', 'Female', 'Prefer not to say'];
  return validGenders.includes(gender);
};

const isValidDOB = (dob) => {
  if (!dob || typeof dob !== 'string') return false;
  
  // Check DD/MM/YYYY format
  const dobRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  if (!dobRegex.test(dob)) return false;
  
  const [day, month, year] = dob.split('/').map(Number);
  const date = new Date(year, month - 1, day);
  
  // Check if date is valid and not in future
  return date.getDate() === day &&
         date.getMonth() === month - 1 &&
         date.getFullYear() === year &&
         date <= new Date() &&
         year >= 1900;
};

const isValidPhone = (phone) => {
  return phone && 
         typeof phone === 'string' && 
         /^\+?[\d\s\-\(\)]{10,15}$/.test(phone.trim());
};

const isValidPassword = (password) => {
  return password && 
         typeof password === 'string' && 
         password.length >= 6 && 
         password.length <= 128;
};

// Validation middleware
const validateRegister = (req, res, next) => {
  const { name, age, gender, dob, email, phone, password } = req.body;
  const errors = [];

  // Required fields check
  if (!name) errors.push('Name is required');
  if (!age) errors.push('Age is required');
  if (!gender) errors.push('Gender is required');
  if (!dob) errors.push('Date of birth is required');
  if (!email) errors.push('Email is required');
  if (!phone) errors.push('Phone number is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      errors 
    });
  }

  // Detailed validation
  if (!isValidName(name)) {
    errors.push('Name must be 2-50 characters and contain only letters and spaces');
  }

  if (!isValidAge(age)) {
    errors.push('Age must be between 13 and 120');
  }

  if (!isValidGender(gender)) {
    errors.push('Gender must be Male, Female, or Prefer not to say');
  }

  if (!isValidDOB(dob)) {
    errors.push('Date of birth must be in DD/MM/YYYY format and be a valid past date');
  }

  if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!isValidPhone(phone)) {
    errors.push('Phone number must be 10-15 digits');
  }

  if (!isValidPassword(password)) {
    errors.push('Password must be 6-128 characters long');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors 
    });
  }

  // Sanitize inputs
  req.body.name = validator.escape(name.trim());
  req.body.email = validator.normalizeEmail(email.trim());
  req.body.phone = phone.trim();
  req.body.age = Number(age);

  next();
};

const validateLogin = (req, res, next) => {
  const { email, password } = req.body;
  const errors = [];

  if (!email) errors.push('Email is required');
  if (!password) errors.push('Password is required');

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Missing required fields',
      errors 
    });
  }

  if (!validator.isEmail(email)) {
    errors.push('Please provide a valid email address');
  }

  if (!password || password.length < 1) {
    errors.push('Password is required');
  }

  if (errors.length > 0) {
    return res.status(400).json({ 
      message: 'Validation failed',
      errors 
    });
  }

  // Sanitize
  req.body.email = validator.normalizeEmail(email.trim());

  next();
};

module.exports = {
  validateRegister,
  validateLogin
};