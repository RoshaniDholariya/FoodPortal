const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller.js");

router.post("/approve-ngo/:ngoId", adminController.approveNgo);
router.get('/alldonor', adminController.getallDonor);
router.get('/allngo',adminController.getAllNgos);
module.exports = router;
    