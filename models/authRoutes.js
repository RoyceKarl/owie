const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authMiddleware = require("../middleware/authMiddleware");

// Register a new Super Admin
router.post("/register-superadmin", async (req, res) => {
  try {
    let { username, password, name } = req.body;
    if (!username || !password || !name) {
      return res.status(400).json({ error: "All fields are required" });
    }
    username = username.trim().toLowerCase();
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password for New User:", hashedPassword);
    const user = new User({
      username,
      password: hashedPassword,
      role: "SuperAdmin",
      name,
    });
    await user.save();
    res.status(201).json({ message: "Super Admin registered successfully" });
  } catch (error) {
    console.error("Registration Error:", error);
    res.status(500).json({ error: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  try {
    let { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    username = username.trim().toLowerCase();
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return res.status(400).json({ error: "Invalid credentials" });
    }
    if (!process.env.JWT_SECRET) {
      return res.status(500).json({ error: "Internal server error" });
    }
    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    res.json({ token });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ error: "Login failed" });
  }
});

router.post(
  "/register-admin",
  authMiddleware(["SuperAdmin"]),
  async (req, res) => {
    try {
      let { username, password, name } = req.body;
      if (!username || !password || !name) {
        return res.status(400).json({ error: "All fields are required" });
      }
      username = username.trim().toLowerCase();
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password for New Admin:", hashedPassword);
      const user = new User({
        username,
        password: hashedPassword,
        role: "Admin",
        name,
      });
      await user.save();
      res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {
      console.error("Admin Registration Error:", error);
      res.status(500).json({ error: "Admin registration failed" });
    }
  }
);

router.post(
  "/register-driver",
  authMiddleware(["Admin", "SuperAdmin"]),
  async (req, res) => {
    try {
      let { username, password, licenseNumber, firstName, lastName, company } =
        req.body;
      if (
        !username ||
        !password ||
        !licenseNumber ||
        !firstName ||
        !lastName ||
        !company
      ) {
        return res.status(400).json({ error: "All fields are required" });
      }
      username = username.trim().toLowerCase();
      const existingUser = await User.findOne({ username });
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      console.log("Hashed Password for New Driver:", hashedPassword);
      const user = new User({
        username,
        password: hashedPassword,
        role: "Driver",
        licenseNumber,
        firstName,
        lastName,
        company,
      });
      await user.save();
      res.status(201).json({ message: "Driver registered successfully" });
    } catch (error) {
      console.error("Driver Registration Error:", error);
      res.status(500).json({ error: "Driver registration failed" });
    }
  }
);

const token =
  "eyJhbGciOiJIUzI1NiJ9.e30.ELgRDp1DNOm8VghnDxbADSDkc_BXBl84CjJ7_0DhflM";
const decoded = jwt.decode(token);
console.log("Decoded Token Payload:", decoded);

module.exports = router;
