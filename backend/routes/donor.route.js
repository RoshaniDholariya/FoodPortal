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
  getFoodStatusCounts
} = require("../controller/donor.controller.js");

const router = express.Router();

// Routes
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
router.get("/download-certificate/:donorId", async (req, res) => {
  try {
    const { donorId } = req.params;
    const filePath = path.join(__dirname, "..", "certificates", `${donorId}_certificate.pdf`);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ success: false, message: "Certificate not found" });
    }

    // Send the file for download
    res.download(filePath, `${donorId}_certificate.pdf`, (err) => {
      if (err) {
        console.error("Error downloading certificate:", err);
        res.status(500).json({ success: false, message: "Error downloading certificate" });
      }
    });
  } catch (error) {
    console.error("Error handling certificate download:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

module.exports = router;
