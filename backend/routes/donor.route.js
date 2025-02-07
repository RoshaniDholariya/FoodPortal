const express = require("express");
const {
  registerDonor,
  verifyOTP,
  addDonorDetails,
  authenticate,
  Login,
  addFood,
  getDonorFood,
  getApprovedNGOs,
} = require("../controller/donor.controller.js");

const router = express.Router();

// Routes
router.post("/register", registerDonor);
router.post("/verify-otp", verifyOTP);
router.post("/add-details", addDonorDetails);
router.post("/login", Login);
router.post("/addFood",authenticate, addFood);
router.get("/getDonorFood",authenticate,getDonorFood);
router.get('/approved-ngos',authenticate,getApprovedNGOs);

module.exports = router;
