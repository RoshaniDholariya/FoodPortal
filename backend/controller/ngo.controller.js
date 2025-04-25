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


const PDFDocument = require("pdfkit");
const fs = require("fs");
const cloudinary = require("../config/cloudinaryConfig"); // Import Cloudinary config

async function generateCertificate(donorId) {
  return new Promise((resolve, reject) => {
    const doc = new PDFDocument();
    const filePath = `certificates/${donorId}_certificate.pdf`;

    // Create a write stream and save locally
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Generate Certificate Content
    doc.fontSize(20).text("Certificate of Appreciation", { align: "center" });
    doc.moveDown();
    doc.fontSize(14).text(`This certificate is awarded to Donor ID: ${donorId}`, { align: "center" });
    doc.moveDown();
    doc.text("Thank you for your valuable contribution towards reducing food wastage!", { align: "center" });
    doc.end();

    // Wait for the file to be fully written
    writeStream.on("finish", async () => {
      try {
        // Upload to Cloudinary
        const result = await cloudinary.uploader.upload(filePath, {
          resource_type: "raw",
          folder: "certificates",
          public_id: `${donorId}_certificate`,
        });

        // Delete local file after upload
        fs.unlinkSync(filePath);

        resolve(result.secure_url); // Return Cloudinary URL
      } catch (error) {
        reject(error);
      }
    });

    writeStream.on("error", reject);
  });
}


exports.acceptFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const ngoId = req.user.userId; // Ensure NGO ID is correctly retrieved
    console.log(ngoId);
    // Fetch food details including donorId (explicitly)
    const food = await prisma.foodDetails.findUnique({
      where: { id: foodId },
      include: { donor: true }, // Ensure donor relationship exists
    });

    if (!food) {
      return res.status(404).json({ success: false, message: "Food not found" });
    }

    if (food.status !== "available") {
      return res.status(400).json({ success: false, message: "Food is already taken" });
    }

    // ✅ Update Food Details: Set status & assign NGO ID
    const updatedFood = await prisma.foodDetails.update({
      where: { id: foodId },
      data: {
        status: "completed",
        ngoId: ngoId // Ensure NGO ID is correctly assigned
      },
    });

    if (food.donor) {
      const donorId = food.donor.id;

      // ✅ Update Donor's Points
      const updatedDonor = await prisma.donor.update({
        where: { id: donorId },
        data: {
          totalPoints: food.donor.totalPoints !== null ? { increment: 10 } : 10,
        },
      });

      let certificateUrl = null;
      if (updatedDonor.totalPoints >= 100) {
        // ✅ Generate and Upload Certificate
        certificateUrl = await generateCertificate(donorId);

        // ✅ Update Donor Certificate Count & Reset Points
        await prisma.donor.update({
          where: { id: donorId },
          data: {
            certificatesEarned: { increment: 1 },
            totalPoints: 0,
            latestCertificateUrl: certificateUrl,
          },
        });

        global.io.to(donorId).emit("certificateEarned", {
          message: "Congratulations! You've earned a certificate for your contributions.",
          certificateUrl,
        });
      }

      // ✅ Send Socket Notification to Donor
      global.io.to(donorId).emit("foodAccepted", {
        message: `Your food donation (${food.name}) has been accepted by an NGO.`,
        ngoId,
        pointsEarned: 10,
        foodName: food.name,
      });
    }

    res.status(200).json({
      success: true,
      message: "Food accepted successfully, NGO assigned, and donor rewarded.",
      updatedFood
    });

  } catch (error) {
    console.error("Error accepting food:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
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
    const ngoId = req.user.userId;

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

exports.ngoconnectdetails = async (req, res) => {
  try {
    const { Date, quantity, donorId } = req.body;
    const ngoId = req.user.userId; // Assuming logged-in user is an NGO

    if (!Date || !quantity || !donorId) {
      return res.status(400).json({ success: false, message: "Please fill all required fields." });
    }

    const donorExists = await prisma.donor.findUnique({ where: { id: parseInt(donorId) } });

    if (!donorExists) {
      return res.status(404).json({ success: false, message: "Donor not found." });
    }

    // Create the NGO connection request
    const ngoconnectEntry = await prisma.ngoconnect.create({
      data: {
        ngoId,
        donorId,
        Date,
        quantity,
        status: "PENDING",  // Initial status
        donorResponse: true // Donor has not responded yet
      },
    });

    // Send notification to the donor
    await prisma.notification.create({
      data: {
        donorId: parseInt(donorId),
        message: `NGO ${ngoId} has requested a food donation.`,
      },
    });

    res.status(201).json({ success: true, message: "Request sent successfully.", ngoconnectEntry });
  } catch (error) {
    console.error("❌ Error adding NGO connection:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getNgoConnectDetails = async (req, res) => {
  try {
    const { ngoId } = req.params;

    console.log(ngoId);

    const ngoConnectDetails = await prisma.ngoconnect.findMany({
      where: { ngoId: parseInt(ngoId) },
      select: {
        id: true,
        Date: true,
        quantity: true,
        donorId: true,
        donorResponse: true,
        status: true,
        Donor: {
          select: { name: true, address: true },
        },
      },
      orderBy: {
        Date: "desc",
      },
    });

    if (ngoConnectDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for the given Donor ID.",
      });
    }

    res.status(200).json({
      success: true,
      message: "NGO connection details retrieved successfully.",
      data: ngoConnectDetails,
    });
  } catch (error) {
    console.error("❌ Error fetching NGO connection details:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

const resetCodes = new Map();

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    const user = await prisma.nGO.findUnique({
      where: { email },
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const verificationCode = Math.floor(100000 + Math.random() * 900000).toString();

    resetCodes.set(email, { code: verificationCode, expiresAt: Date.now() + 15 * 60 * 1000 });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: email,
      subject: "Password Reset Verification Code",
      html: `<p>Your password reset code is: <b>${verificationCode}</b></p>
             <p>This code is valid for 15 minutes.</p>`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({ message: "Verification code sent to your email" });
  } catch (error) {
    console.error("Forgot Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.resetPassword = async (req, res) => {
  try {
    const { email, code, newPassword } = req.body;

    if (!email || !code || !newPassword) {
      return res.status(400).json({ message: "Email, code, and new password are required" });
    }

    const storedCodeData = resetCodes.get(email);

    if (!storedCodeData) {
      return res.status(400).json({ message: "Invalid or expired code" });
    }

    if (Date.now() > storedCodeData.expiresAt) {
      resetCodes.delete(email);
      return res.status(400).json({ message: "Code has expired, request a new one" });
    }

    if (code !== storedCodeData.code) {
      return res.status(400).json({ message: "Invalid verification code" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await prisma.nGO.update({
      where: { email },
      data: { password: hashedPassword },
    });

    resetCodes.delete(email);

    res.status(200).json({ message: "Password reset successfully" });
  } catch (error) {
    console.error("Reset Password Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

exports.reportDonation = async function (req, res) {
  const { PrismaClient } = require('@prisma/client');
  const nodemailer = require('nodemailer');

  const prisma = new PrismaClient();

  try {
    const { donorId, ngoId, donationId, report } = req.body;

    const donor = await prisma.donor.findUnique({ where: { id: donorId } });
    if (!donor) {
      return res.status(404).json({ error: "Donor not found" });
    }

    let updatedWarnings = donor.warning + 1;
    let updateData = { warning: updatedWarnings };


    if (updatedWarnings >= 3) {
      let disableUntil = new Date();
      disableUntil.setDate(disableUntil.getDate() + 14);
      updateData.disabledUntil = disableUntil;
    }

    await prisma.donor.update({
      where: { id: donorId },
      data: updateData
    });
    const foodDetail = await prisma.foodDetails.findUnique({
      where: { id: donationId }
    });

    if (!foodDetail) {
      return res.status(404).json({ error: "Food donation not found" });
    }
    await prisma.foodDetails.update({
      where: { id: donationId },
      data: {
        report: report
      }
    });

    let transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
      }
    });

    let mailOptions = {
      from: process.env.EMAIL,
      to: donor.email,
      subject: "Warning: Issue with Your Donation",
      text: `Your donation has been reported by an NGO.\n\nReport Message: ${report}\nWarning Count: ${updatedWarnings}/3\n\nIf you receive 3 warnings, your account will be disabled for 2 weeks.`
    };

    await transporter.sendMail(mailOptions);

    return res.json({ success: true, message: "Donation reported, and donor warned." });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "Internal server error" });
  }
};
exports.getNgoDashboard = async (req, res) => {
  const { ngoId } = req.params;
  const ngoIdInt = parseInt(ngoId);

  try {
    const ngo = await prisma.nGO.findUnique({
      where: { id: ngoIdInt },
      include: {
        FoodDetails: true,
        Ngoconnect: true,
      },
    });

    if (!ngo) {
      return res.status(404).json({ success: false, message: "NGO not found" });
    }

    const totalFoodDonations = await prisma.foodDetails.count({
      where: { ngoId: ngoIdInt },
    });

    const acceptedFoodDonations = await prisma.foodDetails.count({
      where: { ngoId: ngoIdInt, status: "completed" },
    });

    const pendingFoodDonations = await prisma.foodDetails.count({
      where: { ngoId: ngoIdInt, status: "available" },
    });



    const uniqueDonorCount = await prisma.ngoconnect.groupBy({
      by: ['donorId'], // Group by donorId to get unique donors
      where: { ngoId: ngoIdInt },
    });

    const totalDonorsConnected = uniqueDonorCount.length; // Count unique donors

    const notifications = await prisma.notification.findMany({
      where: { donorId: ngoIdInt },
      orderBy: { createdAt: "desc" },
    });

    const connections = await prisma.ngoconnect.findMany({
      where: { ngoId: ngoIdInt },
      include: { Donor: true },
    });

    res.json({
      success: true,
      data: {
        ngo,
        totalFoodDonations,
        acceptedFoodDonations,
        pendingFoodDonations,
        totalDonorsConnected,
        notifications,
        connections,
      },
    });

  } catch (error) {
    console.error("Error fetching NGO dashboard data:", error);
    res.status(500).json({ success: false, message: "Error fetching dashboard data", error });
  }
};

