const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const app = express.Router();
const recommendationController = require('../controllers/recommendationController');
const getRecommendations  = require('../controllers/recommendationController');

app.post('/recommendations', getRecommendations.getRecommendations);

app.post('/handleRecommendation', recommendationController.handleRecommendation);

// POST request to register a user
app.post('/register', async (req, res) => {
  const { username, email, password, confirmPassword } = req.body;
  console.log(req.body);

  // Validate input
  if (!username || !email || !password || !confirmPassword) {
    return res.status(400).json({ msg: 'All fields are required' });
  }

  // Check if passwords match
  if (password !== confirmPassword) {
    return res.status(400).json({ msg: 'Passwords do not match' });
  }

  try {
    // Check if user already exists with the same email
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ msg: 'Email already in use' });
    }

    // Check if user already exists with the same username
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(400).json({ msg: 'Username already in use' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ msg: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: `Server error ${err}` });
  }
});

// POST request to login a user
app.post('/login', async (req, res) => {
  const { usernameOrEmail, password } = req.body;
  console.log(req.body);
  
  // Validate input
  if (!usernameOrEmail || !password) {
    return res.status(400).json({ msg: 'Username and password are required' });
  }

  try {
    // Check if the user exists
    const user = await User.findOne({
      $or: [{ username: usernameOrEmail }, { email: usernameOrEmail }],
    });
    
    if (!user) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Compare password with hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid username or password' });
    }

    // Create and sign the JWT token
    const payload = {
      username: user.username,
      email: user.email,
    };

    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });

    // Send the token in the response
    res.status(200).json({ msg: 'Login successful', token });

  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: `Server error ${err}` });
  }
});

module.exports = app;
