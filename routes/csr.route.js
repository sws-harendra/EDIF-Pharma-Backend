const express = require("express");
const router = express.Router();
const controller = require("../controllers/contactLead.controller");

// Submit contact or quote form
router.post("/", controller.csradd);

// Admin routes
router.get("/", controller.getcsr);
router.get("/export", controller.exportToCSV);

module.exports = router;
