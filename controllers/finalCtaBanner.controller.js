const db = require("../models");
const FinalCTABanner = db.FinalCTABanner;

exports.createCTABanner = async (req, res) => {
  try {
    const record = await FinalCTABanner.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to create CTA banner", details: err.message });
  }
};

exports.getCTABanner = async (req, res) => {
  try {
    const record = await FinalCTABanner.findOne({ where: { enabled: true } });
    res.json(record);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch CTA banner", details: err.message });
  }
};

exports.updateCTABanner = async (req, res) => {
  try {
    const { id } = req.params;
    await FinalCTABanner.update(req.body, { where: { id } });
    res.json({ message: "CTA banner updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update CTA banner", details: err.message });
  }
};
