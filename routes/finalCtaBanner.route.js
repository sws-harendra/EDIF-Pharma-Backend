const express = require("express");
const router = express.Router();
const controller = require("../controllers/finalCtaBanner.controller");

router.post("/", controller.createCTABanner);
router.get("/", controller.getCTABanner);
router.put("/:id", controller.updateCTABanner);

module.exports = router;
