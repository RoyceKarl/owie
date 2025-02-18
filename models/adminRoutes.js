const express = require("express");
const router = express.Router();
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const authMiddleware = require("../middleware/authMiddleware");

// Middleware to ensure only Admins can access these routes
router.use(authMiddleware(["Admin"]));

// Add a new user (Driver, Mechanic, Dispatcher, HealthDispatcher)
router.post("/add-user", async (req, res) => {
  try {
    const { username, password, name, role } = req.body;

    // Validate role (Admin can only create specific roles)
    const allowedRoles = [
      "Driver",
      "Mechanic",
      "Dispatcher",
      "HealthDispatcher",
    ];
    if (!allowedRoles.includes(role)) {
      return res.status(400).json({
        error:
          "Invalid role. Admins can only create Driver, Mechanic, Dispatcher, or HealthDispatcher accounts.",
      });
    }

    // Check if the user already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already exists" });
    }

    // Create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      password: hashedPassword,
      role,
      name,
    });

    await user.save();
    res.status(201).json({ message: `${role} account created successfully` });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ error: "Failed to create user" });
  }
});

// Get all users (excluding SuperAdmins and Admins)
router.get("/users", async (req, res) => {
  try {
    const users = await User.find(
      { role: { $nin: ["SuperAdmin", "Admin"] } }, // Exclude SuperAdmins and Admins
      "username role name"
    );
    res.json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

module.exports = router;
