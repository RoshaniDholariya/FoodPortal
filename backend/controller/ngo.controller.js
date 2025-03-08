const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

exports.submitNgoForm = async (req, res) => {
  try {
    const { name, address, email, phoneNumber, city, pincode } = req.body;

    const certificate = req.file.path;

    const newNgo = await prisma.nGO.create({
      data: {
        name,
        address,
        email,
        phoneNumber,
        city,
        pincode,
        certificate,
      },
    });
    res.status(200).json({ success: true, message: "Form submitted successfully. Awaiting admin approval." });
  } catch (error) {
    console.error("Error submitting NGO form:", error);
    res.status(500).json({
      success: false,
      message: "Error submitting form",
      error: error.message || error
    });
  }
};
exports.Login = async (req, res) => {
  try {
    console.log("Request Body:", req.body);

    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await prisma.nGO.findUnique({
      where: { email },
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

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }


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
    const ngoId = req.user.userId;
    const ngo = await prisma.nGO.findUnique({
      where: { id: ngoId },
      select: { city: true }
    });
    if (!ngo) {
      return res.status(404).json({ success: false, message: "NGO not found" });
    }

    const currentDate = new Date();

    await prisma.foodDetails.updateMany({
      where: {
        status: "available",
        expiryDate: {
          lt: currentDate
        }
      },
      data: {
        status: "expired"
      }
    });

    const availableFood = await prisma.foodDetails.findMany({
      where: {
        City: {
          equals: ngo.city,
          mode: 'insensitive'
        },
        status: "available",
        expiryDate: {
          gt: currentDate
        }
      },
      include: {
        donor: { select: { name: true, email: true } }
      }
    });

    res.status(200).json({ success: true, availableFood });

  } catch (error) {
    console.error("Error fetching available food:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.acceptFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const ngoId = req.user.id;

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
    res.status(200).json({ success: true, acceptedFood });
  } catch (error) {
    console.error("Error fetching accepted food:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};
exports.getDonorsForNGO = async (req, res) => {
  try {
    const ngoId = req.user.id;

    const donors = await prisma.donor.findMany({
      where: {
        FoodDetails: {
          some: {
            ngoId: ngoId,
            status: "completed",
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
        restaurantName: true,
        photo: true,
      },
    });
    // console.log(donors)
    res.status(200).json({ success: true, donors });
  } catch (error) {
    console.error("Error fetching donors for NGO:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};


exports.getngoDetails = async (req, res) => {
  try {
    const ngo = await prisma.nGO.findUnique({ where: { id: req.user.userId } });
    if (!ngo) return res.status(404).json({ success: false, message: "NGO not found" });

    res.status(200).json({ success: true, ngo });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving NGO details" });
  }
};


exports.updatengoDetails = async (req, res) => {
  try {
    console.log("Edited Profile:", req.body);
    const updatedNgo = await prisma.nGO.update({
      where: { id: req.user.userId },
      data: req.body,
    });
    res.status(200).json({ success: true, ngo: updatedNgo });

  } catch (error) {
    console.log("Error updating NGO details:", error);
    res.status(500).json({ success: false, message: "Error updating NGO details" });
  }
};