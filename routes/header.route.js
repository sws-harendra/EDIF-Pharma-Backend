const express = require("express");
const router = express.Router();

const {
  createHeader,
  getHeader,
  updateHeader,
  deleteHeader,
} = require("../controllers/header.controller");

router.post("/", createHeader);
router.get("/", getHeader);
router.put("/:id", updateHeader);
router.delete("/:id", deleteHeader);

module.exports = router;
