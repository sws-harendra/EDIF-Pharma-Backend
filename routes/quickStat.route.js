const express = require("express");
const router = express.Router();
const controller = require("../controllers/quickStat.controller");

// POST /api/quick-stats
router.post("/", controller.createQuickStats);
router.get("/", controller.getAllQuickStats);

// GET /api/quick-stats/:headerId
// router.get("/:headerId", controller.getQuickStatsByHeader);

// PUT /api/quick-stats/:id
router.put("/:id", controller.updateQuickStat);

// PUT /api/quick-stats/reorder
router.put("/reorder/all", controller.reorderQuickStats);
router.delete("/delete/:id", controller.deleteQuickStat);

module.exports = router;
