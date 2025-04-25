const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { PrismaClient } = require("@prisma/client");

require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const { socketConfig } = require('../config/Socket')
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const prisma = new PrismaClient();

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

const generateOTP = () =>
  Math.floor(100000 + Math.random() * 900000).toString();

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



    res.status(200).json({ success: true, message: "OTP verified", donor });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    res
      .status(500)
      .json({ message: "Error verifying OTP", error: error.message });
  }
};

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

  if (!donorId) {
    return res.status(400).json({
      success: false,
      message: "Donor ID is required",
    });
  }

  try {
    let uploadedPhoto = null;

    if (photo) {
      if (!photo.startsWith("data:image")) {
        return res.status(400).json({
          success: false,
          message: "Invalid image format. Must be a Base64 string.",
        });
      }

      const uploadResponse = await cloudinary.uploader.upload(photo, {
        folder: "donor_photos",
        resource_type: "image",
      });

      uploadedPhoto = uploadResponse.secure_url;
    }

    const donor = await prisma.donor.update({
      where: {
        id: parseInt(donorId),
      },
      data: {
        name,
        address,
        city,
        state,
        pincode,
        phone,
        donorType,
        photo: uploadedPhoto || null, // Store Cloudinary image URL
        restaurantName: donorType === "RESTAURANT" ? restaurantName : null,
      },
    });

    res.status(200).json({
      success: true,
      message: "Donor details added successfully",
      donor,
    });
  } catch (error) {
    console.error("Backend Error:", error);
    res.status(500).json({
      success: false,
      message: "Error adding donor details",
      error: error.message,
    });
  }
};

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;
  if (!token) return res.status(401).json({ message: "Unauthorized: No token provided" });

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};

exports.getDonorDetails = async (req, res) => {
  try {
    const donor = await prisma.donor.findUnique({ where: { id: req.user.userId } });
    if (!donor) return res.status(404).json({ success: false, message: "Donor not found" });

    res.status(200).json({ success: true, donor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error retrieving donor details" });
  }
};

exports.updateDonorDetails = async (req, res) => {
  try {
    const updatedDonor = await prisma.donor.update({
      where: { id: req.user.userId },
      data: req.body,
    });
    res.status(200).json({ success: true, donor: updatedDonor });
  } catch (error) {
    res.status(500).json({ success: false, message: "Error updating donor details" });
  }
};


// exports.Login = async (req, res) => {
//   const { email, password } = req.body;

//   const user = await prisma.donor.findUnique({ where: { email } });

//   if (!user)
//     return res.status(404).json({ message: "Register to access Portal" });

//   const isValid = await bcrypt.compare(password, user.password);
//   if (!isValid) return res.status(400).json({ message: "Invalid password" });

//   const token = jwt.sign(
//     { userId: user.id },
//     process.env.JWT_SECRET || "your_secret_key",
//     { expiresIn: "1d" }
//   );

//   res
//     .cookie("token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production" ? true : false,
//       sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
//       path: "/",
//     })
//     .status(200)
//     .json({
//       message: "Login successful",
//       success: true,
//       data: user,
//     });
// };
exports.Login = async (req, res) => {
  const { email, password } = req.body;

const user = await prisma.donor.findUnique({ where: { email } });

if (!user)
  return res.status(404).json({ message: "Register to access Portal" });
console.log(user.disabledUntil);
// Check if user is disabled
if (user.disabledUntil && new Date() < new Date(user.disabledUntil)) {
  return res.status(403).json({
    message: `Account disabled until ${new Date(user.disabledUntil).toLocaleString()}`,
  });
}

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
    secure: process.env.NODE_ENV === "production",
    sameSite: process.env.NODE_ENV === "production" ? "None" : "Lax",
    path: "/",
  })
  .status(200)
  .json({
    message: "Login successful",
    success: true,
    data: user,
  });

}

exports.authenticate = (req, res, next) => {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({ message: "Unauthorized: No token provided" });
  }


  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "your_secret_key");
    console.log(decoded);
    req.user = { userId: decoded.userId };
    next();
  } catch (error) {
    console.error("JWT verification error:", error.message);
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};


exports.addFood = async (req, res) => {
  try {
    const {
      foodType,
      foodCategory,
      noOfDishes,
      preparationDate,
      expiryDate,
      address,
      latitude,
      City,
      longitude
    } = req.body;
    const donorId = req.user.userId;

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
        latitude,
        longitude,
        City,
        noOfDishes: parseInt(noOfDishes),
        preparationDate: new Date(preparationDate),
        expiryDate: new Date(expiryDate),
        status: "available",
      },
    });

    if (global.io) {
      global.io.emit('newFoodDonation', {
        type: 'NEW_FOOD_DONATION',
        foodDetails
      });
    }

    res.status(201).json({
      success: true,
      message: 'Food details added successfully.',
      foodDetails,
    });
  } catch (error) {
    console.error('❌ Error adding food details:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getDonorFood = async (req, res) => {
  try {
    const donorId = req.user.userId;
    const currentDate = new Date();

    // First, update any expired food items
    await prisma.foodDetails.updateMany({
      where: {
        donorId,
        status: "available",
        expiryDate: {
          lt: currentDate
        }
      },
      data: {
        status: "expired"
      }
    });
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
exports.getApprovedNGOs = async (req, res) => {
  try {
    const ngos = await prisma.nGO.findMany({
      where: { isApproved: true },
      select: {
        id: true,
        name: true,
        address: true,
        email: true,
        phoneNumber: true,
        city: true,
        pincode: true,
      },
    });

    res.status(200).json({ success: true, ngos });
  } catch (error) {
    console.error('Error fetching NGOs:', error.message);
    res.status(500).json({ success: false, message: 'Internal server error.' });
  }
};

exports.getFoodStatusCounts = async (req, res) => {
  try {
    const donorId = req.user.userId;
    const currentDate = new Date();

    await prisma.foodDetails.updateMany({
      where: {
        donorId,
        status: "available",
        expiryDate: {
          lt: currentDate
        }
      },
      data: {
        status: "expired"
      }
    });

    const availableCount = await prisma.foodDetails.count({
      where: {
        donorId,
        status: "available"
      }
    });

    const expiredCount = await prisma.foodDetails.count({
      where: {
        donorId,
        status: "expired"
      }
    });

    const completedCount = await prisma.foodDetails.count({
      where: {
        donorId,
        status: "completed"
      }
    });

    const pieData = [
      { name: "Available", value: availableCount },
      { name: "Expired", value: expiredCount },
      { name: "Completed", value: completedCount }
    ];

    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 6);

    const weeklyItems = await prisma.foodDetails.findMany({
      where: {
        donorId,
        createdAt: {
          gte: sevenDaysAgo
        }
      },
      select: {
        status: true,
        createdAt: true
      }
    });

    const weeklyData = [];
    const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    for (let i = 0; i < 7; i++) {
      const date = new Date();
      date.setDate(date.getDate() - (6 - i));
      const dayName = dayNames[date.getDay()];
      const formattedDate = date.toISOString().split('T')[0];

      weeklyData.push({
        name: dayName,
        date: formattedDate,
        completed: 0,
        expired: 0
      });
    }

    weeklyItems.forEach(item => {
      const itemDate = item.createdAt.toISOString().split('T')[0];
      const dayIndex = weeklyData.findIndex(day => day.date === itemDate);

      if (dayIndex !== -1) {
        if (item.status === "completed") {
          weeklyData[dayIndex].completed += 1;
        } else if (item.status === "expired") {
          weeklyData[dayIndex].expired += 1;
        }
      }
    });

    res.status(200).json({
      success: true,
      pieData,
      weeklyData
    });
  } catch (error) {
    console.error('Error fetching chart data:', error.message);
    res.status(500).json({
      success: false,
      message: 'Error retrieving dashboard chart data',
      error: error.message
    });
  }
};

exports.donorResponse = async (req, res) => {
  try {
    const { ngoconnectId, response } = req.body; // response = true (accept) or false (reject)
    const donorId = req.user.userId; // Assuming logged-in user is a donor

    const ngoconnect = await prisma.ngoconnect.findUnique({ where: { id: parseInt(ngoconnectId) } });

    if (!ngoconnect || ngoconnect.donorId !== donorId) {
      return res.status(404).json({ success: false, message: "Request not found or unauthorized." });
    }

    if (ngoconnect.status !== "PENDING") {
      return res.status(400).json({ success: false, message: "Request already processed." });
    }

    const updatedNgoconnect = await prisma.ngoconnect.update({
      where: { id: parseInt(ngoconnectId) },
      data: {
        status: response ? "ACCEPTED" : "REJECTED",
        donorResponse: response
      },
    });

    await prisma.notification.create({
      data: {
        donorId: ngoconnect.ngoId,
        message: response
          ? `Your donation request has been accepted by Donor ${donorId}.`
          : `Your donation request was rejected by Donor ${donorId}.`,
      },
    });

    res.status(200).json({ success: true, message: `Request ${response ? "accepted" : "rejected"} successfully.` });
  } catch (error) {
    console.error("❌ Error updating request status:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getDonorRequests = async (req, res) => {
  try {
    const donorId = req.user.userId;

    const requests = await prisma.ngoconnect.findMany({
      where: { donorId: donorId, status: "PENDING"},
      select: {
        id: true,
        Date: true,
        quantity: true,
        NGO: { select: { name: true, address: true } },
      },
      orderBy: { Date: "desc" },
    });

    res.status(200).json({ success: true, message: "Pending requests fetched.", data: requests });
  } catch (error) {
    console.error("❌ Error fetching donor requests:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

exports.getallDonorRequests = async (req, res) => {
  try {
    const donorId = req.user.userId;
    const today = new Date();

    const requests = await prisma.ngoconnect.findMany({
      where: { donorId: donorId },
      select: {
        id: true,
        Date: true,
        quantity: true,
        status: true,
        NGO: { select: { name: true, address: true } },
      },
      orderBy: { Date: "desc" },
    });

    const updatedRequests = requests.map(request => ({
      ...request,
      isDisabled: new Date(request.Date) < today, // Disable past requests
    }));

    res.status(200).json({ success: true, message: "Pending requests fetched.", data: updatedRequests });
  } catch (error) {
    console.error("❌ Error fetching donor requests:", error.message);
    res.status(500).json({ success: false, message: "Internal server error." });
  }
};

