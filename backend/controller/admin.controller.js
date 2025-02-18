const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
require("dotenv").config();

exports.approveNgo = async (req, res) => {
  try {
    const { ngoId } = req.params;

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

    const username = ngo.email;
    const password = Math.random().toString(36).slice(-8); 

    const hashedPassword = await bcrypt.hash(password, 10);

    const updatedNgo = await prisma.nGO.update({
      where: { id: parseInt(ngoId) },
      data: {
        isApproved: true,
        username,
        password: hashedPassword, 
      },
    });

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL,
      to: ngo.email,
      subject: "NGO Approval Notification",
      text: `Congratulations! Your NGO has been approved.\n\nUsername: ${username}\nPassword: ${password}\nLogin Link: http://yourwebsite.com/login`,
    };

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

exports.getallDonor= async(req,res)=>{
  try {
    const donors = await prisma.donor.findMany(); // Fetch all donors
    res.status(200).json({
        success: true,
        data: donors
    });
} catch (error) {
    console.error("Error fetching donors:", error);
    res.status(500).json({
        success: false,
        message: "Failed to fetch donors",
        error: error.message
    });
}
}
exports.getAllNgos = async (req, res) => {
  try {
    const ngos = await prisma.nGO.findMany(); 

    res.status(200).json({
      success: true,
      data: ngos,
    });
  } catch (error) {
    console.error("Error fetching NGOs:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch NGOs",
      error: error.message,
    });
  }
};