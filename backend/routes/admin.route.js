const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller.js");

router.post("/approve-ngo/:ngoId", adminController.approveNgo);
// router.post("/reject-ngo/:ngoId", adminController.rejectNgo);
router.get('/alldonor', adminController.getallDonor);
// router.get('/getdonorbyid/:donorId', adminController.getDonorById);
router.get('/allngo', adminController.getAllNgos);
module.exports = router;
