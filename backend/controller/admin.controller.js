const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

// Approve NGO
exports.approveNgo = async (req, res) => {
  try {
    const { ngoId } = req.params;

    // Find NGO in the database
    const ngo = await prisma.nGO.findUnique({
      where: { id: parseInt(ngoId) },
    });

    if (!ngo) {
      return res.status(404).json({ success: false, message: "NGO not found" });
    }

    if (ngo.isApproved) {
      return res
        .status(400)
        .json({ success: false, message: "NGO is already approved" });
    }

    // Generate username and password
    const username = ngo.email.split("@")[0];
    const password = Math.random().toString(36).slice(-8); // Generate a random password

    // Hash password before storing
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update NGO as approved with login credentials
    const updatedNgo = await prisma.nGO.update({
      where: { id: parseInt(ngoId) },
      data: {
        isApproved: true,
        username,
        password: hashedPassword, // Store hashed password
      },
    });

    // Configure Nodemailer
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    // Email options
    const mailOptions = {
      from: process.env.EMAIL,
      to: ngo.email,
      subject: "NGO Approval Notification",
      text: `Congratulations! Your NGO has been approved.\n\nUsername: ${username}\nPassword: ${password}\nLogin Link: http://yourwebsite.com/login`,
    };

    // Send email
    await transporter.sendMail(mailOptions);

    res
      .status(200)
      .json({ success: true, message: "NGO approved and email sent." });
  } catch (error) {
    console.error("Error approving NGO:", error);
    res
      .status(500)
      .json({
        success: false,
        message: "Error approving NGO",
        error: error.message,
      });
  }
};
