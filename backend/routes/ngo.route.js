const express = require("express");
const router = express.Router();
const ngoController = require("../controller/ngo.controller");
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const cloudinary = require("cloudinary").v2;

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Cloudinary storage
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "ngo_certificates", // Folder name in Cloudinary
    allowed_formats: ["jpg", "jpeg", "png", "pdf"], // Allowed file types
  },
});

const upload = multer({ storage });

// Routes
router.post("/submit", upload.single("certificate"), ngoController.submitNgoForm);
router.post("/login", ngoController.Login);
router.get("/getAvailableFood",ngoController.authenticate,ngoController.getAvailableFood);
router.post("/acceptFood",ngoController.authenticate,ngoController.acceptFood);
router.get("/getacceptedFood",ngoController.authenticate,ngoController.getAcceptedFood);
router.get("/getDonorsForNGO",ngoController.authenticate,ngoController.getDonorsForNGO);


module.exports = router;
