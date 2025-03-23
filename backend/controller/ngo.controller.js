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

// exports.acceptFood = async (req, res) => {
//   try {
//     const { foodId } = req.body;
//     const ngoId = req.user.id;

//     const food = await prisma.foodDetails.findUnique({ where: { id: foodId } });

//     if (!food) {
//       return res.status(404).json({ success: false, message: "Food not found" });
//     }

//     if (food.status !== "available") {
//       return res.status(400).json({ success: false, message: "Food is already taken" });
//     }

//     const updatedFood = await prisma.foodDetails.update({
//       where: { id: foodId },
//       data: { status: "completed", ngoId },
//     });

//     res.status(200).json({ success: true, message: "Food accepted successfully", updatedFood });
//   } catch (error) {
//     console.error('Error accepting food:', error.message);
//     res.status(500).json({ success: false, message: 'Internal server error.' });
//   }
// };

// exports.acceptFood = async (req, res) => {
//   try {
//     const { foodId } = req.body;
//     const ngoId = req.user.id;

//     // Fetch the food details along with the donor's information
//     const food = await prisma.foodDetails.findUnique({
//       where: { id: foodId },
//       include: { donor: true }, // Assuming donor details are linked
//     });

//     if (!food) {
//       return res.status(404).json({ success: false, message: "Food not found" });
//     }

//     if (food.status !== "available") {
//       return res.status(400).json({ success: false, message: "Food is already taken" });
//     }

//     // Update the food status and associate it with the NGO
//     const updatedFood = await prisma.foodDetails.update({
//       where: { id: foodId },
//       data: { status: "completed", ngoId },
//     });

//     // Send real-time notification via Socket.io
//     if (food.donor) {
//       const donorId = food.donor.id; // Assuming donor has an ID
//       global.io.to(donorId).emit("foodAccepted", {
//         message: `Your food donation (${food.name}) has been accepted by an NGO.`,
//         ngoId,
//         foodName: food.name,
//       });
//     }

//     res.status(200).json({ success: true, message: "Food accepted successfully", updatedFood });
//   } catch (error) {
//     console.error("Error accepting food:", error.message);
//     res.status(500).json({ success: false, message: "Internal server error." });
//   }
// };

const PDFDocument = require('pdfkit');
const fs = require('fs');


function generateCertificate(donorId) {
  const doc = new PDFDocument();
  const filePath = `certificates/${donorId}_certificate.pdf`;

  doc.pipe(fs.createWriteStream(filePath));
  doc.fontSize(20).text("Certificate of Appreciation", { align: "center" });
  doc.moveDown();
  doc.fontSize(14).text(`This certificate is awarded to Donor ID: ${donorId}`, { align: "center" });
  doc.moveDown();
  doc.text("Thank you for your valuable contribution towards reducing food wastage!", { align: "center" });
  doc.end();

  return filePath;
}

exports.acceptFood = async (req, res) => {
  try {
    const { foodId } = req.body;
    const ngoId = req.user.id;

    const food = await prisma.foodDetails.findUnique({
      where: { id: foodId },
      include: { donor: true },
    });

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

    if (food.donor) {
      const donorId = food.donor.id;

      const updatedDonor = await prisma.donor.update({
        where: { id: donorId },
        data: {
          totalPoints: food.donor.totalPoints !== null ? { increment: 10 } : 10,
        },
      });

      if (updatedDonor.totalPoints >= 100) {
        await prisma.donor.update({
          where: { id: donorId },
          data: {
            certificatesEarned: { increment: 1 },
            points: updatedDonor.totalPoints,
            totalPoints: 0,
          },
        });
        generateCertificate(donorId);
        global.io.to(donorId).emit("certificateEarned", {
          message: "Congratulations! You've earned a certificate for your contributions.",
        });
      }

      global.io.to(donorId).emit("foodAccepted", {
        message: `Your food donation (${food.name}) has been accepted by an NGO.`,
        ngoId,
        pointsEarned: 10,
        foodName: food.name,
      });
    }

    res.status(200).json({ success: true, message: "Food accepted successfully, donor rewarded.", updatedFood });
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


exports.ngoconnectdetails = async (req, res) => {
  try {
    const { Date, quantity } = req.body;
    const ngoId = req.user.userId;

    if (!Date || !quantity) {
      return res.status(400).json({
        success: false,
        message: 'Please fill all the required fields.',
      });
    }

    const ngoconnectEntry = await prisma.ngoconnect.create({
      data: {
        ngoId,
        Date,
        quantity,
      },
    });

    res.status(201).json({
      success: true,
      message: 'NGO connection details added successfully.',
      ngoconnectEntry,
    });
  } catch (error) {
    console.error('❌ Error adding NGO connection details:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getNgoConnectDetails = async (req, res) => {
  try {
    const { ngoId } = req.params; // Extract NGO ID from request parameters

    if (!ngoId) {
      return res.status(400).json({
        success: false,
        message: "NGO ID is required.",
      });
    }

    const ngoConnectDetails = await prisma.ngoconnect.findMany({
      where: { ngoId: parseInt(ngoId) },
      select: {
        id: true,
        Date: true,
        quantity: true,
      },
      orderBy: {
        Date: "desc", // Sorting by latest records
      },
    });

    if (ngoConnectDetails.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No records found for the given NGO ID.",
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
