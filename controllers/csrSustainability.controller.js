const db = require("../models");
const CSRSustainability = db.CSRSustainability;

exports.createCSR = async (req, res) => {
  try {
    const record = await CSRSustainability.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create CSR record", details: err.message });
  }
};

exports.getCSR = async (req, res) => {
  try {
    const record = await CSRSustainability.findOne({
      where: { enabled: true },
    });
    res.json(record);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch CSR section", details: err.message });
  }
};

exports.updateCSR = async (req, res) => {
  try {
    const { id } = req.params;
    await CSRSustainability.update(req.body, { where: { id } });
    res.json({ message: "CSR updated successfully" });
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to update CSR section", details: err.message });
  }
};
