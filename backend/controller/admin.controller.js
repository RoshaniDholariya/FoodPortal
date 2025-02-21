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
      subject: "Congratulations! Your NGO Application is Approved",
      text: `Congratulations! Your NGO has been approved.\n\nUsername: ${username}\nPassword: ${password}\nLogin Link: http://yourwebsite.com/login`,
      html: `
        <!DOCTYPE html>
        <html>
        <head>
          <style>
            .container {
              max-width: 600px;
              margin: 0 auto;
              font-family: Arial, sans-serif;
              padding: 30px;
              background-color: #ffffff;
            }
            .header {
              text-align: center;
              padding: 30px;
              background: linear-gradient(135deg, #28a745 0%, #20c997 100%);
              border-radius: 12px;
              margin-bottom: 30px;
            }
            .header img {
              width: 80px;
              height: 80px;
              margin-bottom: 15px;
            }
            .content {
              line-height: 1.6;
              color: #333333;
            }
            .credentials-box {
              background-color: #f8f9fa;
              border: 1px solid #e9ecef;
              border-radius: 8px;
              padding: 20px;
              margin: 25px 0;
            }
            .credential-item {
              margin: 10px 0;
              padding: 12px;
              background: white;
              border-radius: 6px;
              border: 1px solid #e0e0e0;
            }
            .login-button {
              display: inline-block;
              padding: 14px 30px;
              background-color: #28a745;
              color: #ffffff;
              text-decoration: none;
              border-radius: 6px;
              font-weight: bold;
              margin: 20px 0;
            }
            .footer {
              margin-top: 30px;
              padding-top: 20px;
              border-top: 1px solid #eeeeee;
              text-align: center;
              color: #666666;
            }
            .important-note {
              background-color: #fff3cd;
              border: 1px solid #ffeeba;
              color: #856404;
              padding: 15px;
              border-radius: 6px;
              margin: 20px 0;
            }
            .social-links {
              margin-top: 20px;
            }
            .social-links a {
              margin: 0 10px;
              color: #666666;
              text-decoration: none;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z'/%3E%3C/svg%3E" alt="Success Icon"/>
              <h1 style="color: #ffffff; margin: 0; font-size: 24px;">Congratulations!</h1>
              <p style="color: #ffffff; margin: 10px 0 0 0;">Your NGO Application Has Been Approved</p>
            </div>
    
            <div class="content">
              <p>Dear ${ngo.name},</p>
              <p>We are delighted to inform you that your NGO application has been approved! You can now access our platform using the credentials below.</p>
    
              <div class="credentials-box">
                <h3 style="margin-top: 0; color: #28a745;">Your Login Credentials</h3>
                <div class="credential-item">
                  <strong style="color: #666;">Username:</strong>
                  <span style="float: right;">${username}</span>
                </div>
                <div class="credential-item">
                  <strong style="color: #666;">Password:</strong>
                  <span style="float: right;">${password}</span>
                </div>
              </div>
    
              <div style="text-align: center;">
                <a href="http://yourwebsite.com/login" class="login-button">
                  Login to Your Account
                </a>
              </div>
    
              <div class="important-note">
                <strong>Important:</strong>
                <p style="margin: 5px 0 0 0;">For security reasons, we recommend changing your password after your first login.</p>
              </div>
    
              <p>With your approved status, you can now:</p>
              <ul style="padding-left: 20px; color: #555;">
                <li>Access the NGO dashboard</li>
                <li>Manage your NGO profile</li>
                <li>Post updates and campaigns</li>
                <li>Connect with donors and volunteers</li>
              </ul>
    
              <p>If you need any assistance or have questions, our support team is here to help!</p>
              
              <p>Best regards,<br>The NGO Platform Team</p>
            </div>
            
            <div class="footer">
              <p>© 2025 NGO Platform. All rights reserved.</p>
              <div class="social-links">
                <a href="#">Facebook</a> |
                <a href="#">Twitter</a> |
                <a href="#">LinkedIn</a>
              </div>
              <p style="font-size: 12px; margin-top: 15px;">
                This is an automated message. Please do not reply directly to this email.
              </p>
            </div>
          </div>
        </body>
        </html>
      `
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

exports.getallDonor = async (req, res) => {
  try {
    const donors = await prisma.donor.findMany();
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