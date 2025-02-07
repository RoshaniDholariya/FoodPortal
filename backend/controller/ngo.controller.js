const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.submitNgoForm = async (req, res) => {
  try {
    const { name, address, email, phoneNumber, city, pincode } = req.body;
  
    // Cloudinary file URL from multer
    const certificate = req.file.path; 

    const newNgo = await prisma.nGO.create({
      data: {
        name,
        address,
        email,
        phoneNumber,
        city,
        pincode,
        certificate, // Store the Cloudinary URL
      },
    });
// console.log(newNgo.data);
    res.status(200).json({ success: true, message: "Form submitted successfully. Awaiting admin approval." });
  } catch (error) {
    console.error("Error submitting NGO form:", error); // Log the full error
    res.status(500).json({ 
      success: false, 
      message: "Error submitting form", 
      error: error.message || error 
    });
  }
};
exports.Login = async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Debugging

    const { email, password } = req.body; // Use 'email' instead of 'username'

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.nGO.findUnique({
      where: { email }, // Find user by email
    });

    if (!user) {
      return res.status(404).json({ message: "User not found. Register to access portal" });
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || "your_secret_key",
      { expiresIn: "1d" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      path: "/",
    });

    res.status(200).json({
      message: "Login successful",
      success: true,
      token,
      data: user,
    });

  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Middleware for authentication
exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  // console.log("Received Token:", token); // Debugging line

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
exports.getAvailableFood = async (req, res) => {
  try {
    const availableFood = await prisma.foodDetails.findMany({
      where: { status: "available" },
      include: { donor: { select: { name:true, email:true } } },
    });
        // console.log(availableFood);
    res.status(200).json({ success: true, availableFood });
  } catch (error) {
    console.error('Error fetching available food:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
exports.acceptFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const ngoId = req.user.id; // NGO ID from authenticated user

    const food = await prisma.foodDetails.findUnique({ where: { id: foodId } });

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    if (food.status !== "available") {
      return res.status(400).json({ success: false, message: "Food is already taken" });
    }

    const updatedFood = await prisma.foodDetails.update({
      where: { id: foodId },
      data: { status: "completed", ngoId },
    });

    res.status(200).json({ success: true, message: "Food accepted successfully", updatedFood });
  } catch (error) {
    console.error('Error accepting food:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
exports.getAcceptedFood = async (req, res) => {
  try {
    const acceptedFood = await prisma.foodDetails.findMany({
      where: { status: "completed" },
      include: { donor: true },
    });
    // console.log(acceptedFood);
    res.status(200).json({ success: true, acceptedFood });
  } catch (error) {
    console.error("Error fetching accepted food:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
exports.getDonorsForNGO = async (req, res) => {
  try {
    const ngoId = req.user.id; // Get the authenticated NGO's ID

    // Fetch distinct donors who have donated food accepted by this NGO
    const donors = await prisma.donor.findMany({
      where: {
        FoodDetails: {
          some: {
            ngoId: ngoId, // Filter foods accepted by this NGO
            status: "completed", // Only completed (accepted) donations
          },
        },
      },
      select: {
        id: true,
        name: true,
        email: true,
        phone: true,
        address: true,
        city: true,
        state: true,
        pincode: true,
        donorType: true,
        restaurantName: true, // Only for restaurant-type donors
        photo: true, // Profile photo if available
      },
    });
// console.log(donors)
    res.status(200).json({ success: true, donors });
  } catch (error) {
    console.error("Error fetching donors for NGO:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
