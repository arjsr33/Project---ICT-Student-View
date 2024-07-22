const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const Signup = require('./models/Signup');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

const app = express();
const port = 3001; // Define the port number

// Middleware setup
app.use(express.json());
app.use(cors({
  origin: ["http://localhost:5173"],
  methods: ["GET", "POST"],
  credentials: true
}));
app.use(cookieParser());

// Connect to MongoDB
mongoose.connect(
  "mongodb+srv://princymoljoseph:IxtVIf2mR7JCkC4m@cluster0.xsykx8r.mongodb.net/Signup",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
)
.then(() => console.log("MongoDB connected successfully"))
.catch((error) => console.log("MongoDB connection error:", error));

// Middleware to verify JWT token
const verifyUser = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }
  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }
    req.user = decoded; // Attach decoded token to req.user
    next();
  });
};

// Protected route example
app.get('/home', verifyUser, (req, res) => {
  res.status(200).json("Success");
});

// Define the Login route (with bcrypt and JWT)
app.post('/login', async (req, res) => {
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

    const token = jwt.sign({ email: user.email }, "jwt-secret-key", { expiresIn: "1d" });
    res.cookie("token", token, { httpOnly: true, secure: true, sameSite: 'None' });

    res.status(200).json({ message: "Login successful", user });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: "Server error" });
  }
});

// Define the Signup route
app.post('/Signup', (req, res) => {
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
app.get('/verify-token', (req, res) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "No token provided" });
  }

  jwt.verify(token, "jwt-secret-key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Invalid token" });
    }

    res.status(200).json({ message: "Token is valid", email: decoded.email });
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});






