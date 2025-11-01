const db = require("../models");

exports.createSection = async (req, res) => {
  try {
    const section = await db.Section.create(req.body);
    res.status(201).json(section);
  } catch (err) {
    console.error(err);
    res
      .status(500)
      .json({ error: "Failed to create section", details: err.message });
  }
};

exports.getSections = async (req, res) => {
  try {
    const sections = await db.Section.findAll({
      where: { enabled: true },
      order: [["order", "ASC"]],
    });
    res.json(sections);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to fetch sections", details: err.message });
  }
};
