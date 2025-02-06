const express = require("express");
const router = express.Router();
const adminController = require("../controller/admin.controller.js");

// Approve NGO by ID
router.post("/approve-ngo/:ngoId", adminController.approveNgo);

module.exports = router;
    