const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");
require("dotenv").config();

const prisma = new PrismaClient();

// Email configuration
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

// Helper function to generate OTP
const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

// Register user with email and password
exports.registerDonor = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const donor = await prisma.donor.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });

    // Generate and store OTP
    const otp = generateOTP();
    const otpExpiry = new Date(Date.now() + 15 * 60 * 1000);
    await prisma.donor.update({
      where: { id: donor.id },
      data: { otp, otpExpiry },
    });

    await transporter.sendMail({
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is ${otp}. It is valid for 15 minutes.`,
    });

    res.status(200).json({ message: "OTP sent to your email" });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .json({ message: "Error registering donor", error: error.message });
  }
};

// Verify OTP
exports.verifyOTP = async (req, res) => {
  const { email, otp } = req.body;

  try {
    const donor = await prisma.donor.findUnique({ where: { email } });

    if (!donor || donor.otp !== otp || new Date() > donor.otpExpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    await prisma.donor.update({
      where: { email: email },
      data: { isVerified: true, otp: null, otpExpiry: null },
    });

    //const token = jwt.sign({ id: donor.id, email: donor.email }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({ success: true, message: "OTP verified", donor });
  } catch (error) {
    console.error("Error verifying OTP:", error); // Log the full error
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

// Add donor details
exports.addDonorDetails = async (req, res) => {
  const {
    donorId,
    name,
    address,
    city,
    state,
    pincode,
    phone,
    donorType,
    photo,
    restaurantName,
  } = req.body;

  // Validate donorId
  if (!donorId) {
    return res.status(400).json({
      success: false,
      message: "Donor ID is required",
    });
  }

  try {
    const donor = await prisma.donor.update({
      where: {
        id: parseInt(donorId), // Ensure donorId is an integer
      },
      data: {
        name,
        address,
        city,
        state,
        pincode,
        phone,
        // Store the photo as a string or null
        photo: photo || null,
        donorType,
        restaurantName: donorType === "RESTAURANT" ? restaurantName : null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Donor details added successfully",
      donor,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: "Error adding donor details",
      error: error.message,
    });
  }
};

exports.Login = async (req, res) => {
  const { email, password } = req.body;

  const user = await prisma.donor.findUnique({ where: { email } });

  if (!user)
    return res.status(404).json({ message: "Register to access Portal" });

  const isValid = await bcrypt.compare(password, user.password);
  if (!isValid) return res.status(400).json({ message: "Invalid password" });

  const token = jwt.sign(
    { userId: user.id },
    process.env.JWT_SECRET || "your_secret_key",
    { expiresIn: "1d" }
  );

  res
    .cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production" ? true : false,
      sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
      path: "/",
    })
    .status(200)
    .json({
      message: "Login successful",
      success: true,
      data: user,
    });
};


// Middleware for authentication
exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }

  console.log("Received Token:", token); // Debugging line

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
exports.addFood = async (req, res) => {
  try {
    const { foodType, foodCategory, noOfDishes, preparationDate, expiryDate,address } = req.body;
    const donorId = req.user.userId; // Get donor ID from the authenticated user

    if (!foodType || !foodCategory || !noOfDishes || !preparationDate || !expiryDate || !address) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields.',
      });
    }

    const foodDetails = await prisma.foodDetails.create({
      data: {
        donorId,
        foodType,
        foodCategory,
        address,
        noOfDishes: parseInt(noOfDishes),
        preparationDate: new Date(preparationDate),
        expiryDate: new Date(expiryDate),
        status: "available",
      },
    });

    res.status(201).json({
      success: true,
      message: 'Food details added successfully.',
      foodDetails,
    });
  } catch (error) {
    console.error('Error adding food details:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};
// exports.getDonorFood = async (req, res) => {
//   try {
//     const donorId = req.user.id;

//     const foodList = await prisma.foodDetails.findMany({
//       where: { donorId },
//       include: { ngo: { select: { name, email } } }, // Show which NGO accepted it
//     });

//     res.status(200).json({ success: true, foodList });
//   } catch (error) {
//     console.error('Error fetching donor food:', error.message);
//     res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// };
exports.getDonorFood = async (req, res) => {
  try {
    const donorId = req.user.userId;

    const foodList = await prisma.foodDetails.findMany({
      where: { donorId },
      include: { ngo: { select: { name: true, email: true } } }, 
    });

    res.status(200).json({ success: true, foodList });
  } catch (error) {
    console.error('Error fetching donor food:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};