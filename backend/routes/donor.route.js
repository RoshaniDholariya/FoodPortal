const express = require("express");
const path = require('path');
const fs = require('fs');
const {
  registerDonor,
  verifyOTP,
  addDonorDetails,
  authenticate,
  Login,
  addFood,
  getDonorFood,
  getApprovedNGOs,
  getDonorDetails,
  updateDonorDetails,
  getFoodStatusCounts,
  donorResponse,
  getDonorRequests,
  getallDonorRequests,
  getDonorNotifications
} = require("../controller/donor.controller.js");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();

router.post("/register", registerDonor);
router.post("/verify-otp", verifyOTP);
router.post("/add-details", addDonorDetails);
router.post("/login", Login);
router.post("/addFood", authenticate, addFood);
router.get("/getDonorFood", authenticate, getDonorFood);
router.get("/auth", authenticate);
router.get('/approved-ngos', authenticate, getApprovedNGOs);
router.get("/getDonorDetails", authenticate, getDonorDetails);
router.put("/updateDonorDetails", authenticate, updateDonorDetails);
router.get('/food-status-counts', authenticate, getFoodStatusCounts);

router.post('/sendNGOAcceptence', authenticate, donorResponse);
router.get('/getNGOrequest', authenticate, getDonorRequests);
router.get('/getallNGOrequest', authenticate, getallDonorRequests);
router.get('/getnotification',authenticate,getDonorNotifications);
router.get("/download-certificate/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;

    // Find donor from database
    const donor = await prisma.donor.findFirst({
      where: {
        id: parseInt(donorId),
      },
    });

    console.log(donor)

    if (!donor) {
      return res.status(404).json({ success: false, message: "Donor not found" });
    }

    if (!donor.latestCertificateUrl) {
      return res.status(404).json({ success: false, message: "Certificate not generated yet" });
    }

    // Instead of sending file, send the certificate URL
    res.status(200).json({
      success: true,
      message: "Certificate fetched successfully",
      certificateUrl: donor.latestCertificateUrl,
    });


  } catch (error) {
    console.error("Error fetching certificate:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
