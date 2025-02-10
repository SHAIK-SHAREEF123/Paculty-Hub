const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { OAuth2Client } = require("google-auth-library");
const User = require("../models/user.js");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
const router = express.Router();

// Signup Route
router.post("/signup", async (req, res) => {
  try {
    console.log(req.body);
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.status(201).json({ user: { email: newUser.email } });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Login Route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid email or password" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid email or password" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    res.json({ user: { email: user.email }, token });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Google Login Route
router.post("/auth/google-login", async (req, res) => {
  try {
    const { token } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });
    
    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });
    if (!user) {
      user = new User({ email, name });
      await user.save();
    }

    const jwtToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.json({
      user: {
        email: user.email,
        name: user.name,
      },
      token: jwtToken,
    });
  } catch (err) {
    res.status(500).json({ message: "Google login failed" });
  }
});

module.exports = router;
