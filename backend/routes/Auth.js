const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { PrismaClient } = require("@prisma/client");
const { OAuth2Client } = require("google-auth-library");

const router = express.Router();
const prisma = new PrismaClient();
const googleClient = new OAuth2Client("GOOGLE_CLIENT_ID");

// Register
router.post("/register", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  try {
    const user = await prisma.user.create({
      data: { email, password: hashedPassword },
    });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);

    // Check for duplicate user error
    if (error.code === "P2002") {
      return res.status(400).json({ error: "User already exists" });
    }

    res.status(500).json({ error: "Internal server error" });
  }
});

// Login
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.user.findUnique({ where: { email } });
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign({ userId: user.id }, "SECRET_KEY", { expiresIn: "1h" });
  res.json({ token });
});

// Google Login
router.post("/google-login", async (req, res) => {
  const { token } = req.body;

  try {
    const ticket = await googleClient.verifyIdToken({
      idToken: token,
      audience: "YOUR_GOOGLE_CLIENT_ID",
    });
    const { email } = ticket.getPayload();

    let user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      user = await prisma.user.create({ data: { email } });
    }

    const jwtToken = jwt.sign({ userId: user.id }, "SECRET_KEY", {
      expiresIn: "1h",
    });
    res.json({ token: jwtToken });
  } catch (error) {
    res.status(400).json({ error: "Google authentication failed" });
  }
});

module.exports = router;
