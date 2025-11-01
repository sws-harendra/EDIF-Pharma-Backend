const express = require("express");
const router = express.Router();
const controller = require("../controllers/csrSustainability.controller");

router.post("/", controller.createCSR);
router.get("/", controller.getCSR);
router.put("/:id", controller.updateCSR);

module.exports = router;
