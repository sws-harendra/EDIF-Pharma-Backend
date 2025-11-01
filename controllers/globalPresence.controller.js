const db = require("../models");
const GlobalPresence = db.GlobalPresence;

exports.createGlobalPresence = async (req, res) => {
  try {
    const record = await GlobalPresence.create(req.body);
    res.status(201).json(record);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({
        error: "Failed to create Global Presence",
        details: err.message,
      });
  }
};

exports.getGlobalPresence = async (req, res) => {
  try {
    const record = await GlobalPresence.findOne({ where: { enabled: true } });
    res.json(record);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch Global Presence", details: err.message });
  }
};

exports.updateGlobalPresence = async (req, res) => {
  try {
    const { id } = req.params;
    const updated = await GlobalPresence.update(req.body, { where: { id } });
    res.json({ message: "Updated successfully", updated });
  } catch (err) {
    res
      .status(500)
      .json({
        error: "Failed to update Global Presence",
        details: err.message,
      });
  }
};
