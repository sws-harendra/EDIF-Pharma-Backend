const express = require("express");
const router = express.Router();
const heroController = require("../controllers/heroSection.controller");

// POST /api/hero
router.post("/", heroController.createHeroSection);

// GET /api/hero/:headerId
router.get("/:headerId", heroController.getHeroSectionByHeader);

// PUT /api/hero/:id
router.put("/:id", heroController.updateHeroSection);

module.exports = router;
