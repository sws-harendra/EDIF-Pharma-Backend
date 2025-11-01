const express = require("express");
const router = express.Router();
const controller = require("../controllers/innovation.controller");

router.post("/", controller.createSection);
router.get("/", controller.getSections);

module.exports = router;
