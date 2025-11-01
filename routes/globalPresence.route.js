const express = require("express");
const router = express.Router();
const controller = require("../controllers/globalPresence.controller");

router.post("/", controller.createGlobalPresence);
router.get("/", controller.getGlobalPresence);
router.put("/:id", controller.updateGlobalPresence);

module.exports = router;
