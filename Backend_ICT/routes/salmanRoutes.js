
// SignUp and Login routes with JWT and Bcrypt

const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const Signup = require('../model/Signup'); 
require('dotenv').config();


const router = express.Router();

router.use(express.json());
router.use(cookieParser());

const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => { // Use environment variable for the secret key
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach decoded token to req.user
    next();
  });
};

// Protected route example
router.get('/home', verifyUser, (req, res) => {
  res.status(200).json("Success");
});

// Define the Login route (with bcrypt and JWT)
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Signup.findOne({ email: email });

    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ email: user.email }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" }); // Use environment variable for the secret key
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Define the Signup route
router.post('/signup', (req, res) => {
  const { name, email, password, phone, batch } = req.body;

  bcrypt.hash(password, 10)
    .then(hash => {
      Signup.create({ name, email, password: hash, phone, batch })
        .then(signup => {
          console.log('User data received:', req.body);
          res.status(201).json(signup);
        })
        .catch(err => {
          console.error('Error creating user:', err);
          res.status(400).json({ error: err.message });
        });
    })
    .catch(err => {
      console.error('Error hashing password:', err);
      res.status(500).json({ error: 'Server error' });
    });
});

// Optional: Define a route to verify the token and retrieve user info
router.get('/verify-token', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => { // Use environment variable for the secret key
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Token is valid", email: decoded.email });
  });
});

module.exports = router;
