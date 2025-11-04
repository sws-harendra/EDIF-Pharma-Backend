const express = require("express");
const router = express.Router();
const controller = require("../controllers/cetification.controlller");

// POST /api/quick-stats
router.post("/", controller.createCertification);
router.post("/certificatepdfDownload", controller.certificatepdfDownload);
router.get("/", controller.getAlldata);
// GET /api/quick-stats/:headerId
// router.get("/:headerId", controller.getCertificationsByHeader);

// PUT /api/quick-stats/:id
router.put("/:id", controller.updateCertification);

// PUT /api/quick-stats/reorder
router.put("/reorder/all", controller.reorderCertifications);
router.delete("/delete/:id", controller.deleteCertification);

module.exports = router;
