const db = require("../models");
const Section = db.Section;

// Create section
exports.createSection = async (req, res) => {
  try {
    const section = await Section.create(req.body);
    res.status(201).json(section);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create section",
      details: err.message,
    });
  }
};

// Get all enabled sections (sorted by order)
exports.getSections = async (req, res) => {
  try {
    const sections = await Section.findAll({
      where: { enabled: true },
      order: [["order", "ASC"]],
    });
    res.json(sections);
  } catch (err) {
    res.status(500).json({
      error: "Failed to fetch sections",
      details: err.message,
    });
  }
};

// ✅ Update section by ID
exports.updateSection = async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Section.update(req.body, { where: { id } });
    if (updated) {
      const updatedSection = await Section.findByPk(id);
      res.json(updatedSection);
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Failed to update section",
      details: err.message,
    });
  }
};

// ✅ Optional: Delete section
exports.deleteSection = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Section.destroy({ where: { id } });
    if (deleted) {
      res.json({ message: "Section deleted successfully" });
    } else {
      res.status(404).json({ error: "Section not found" });
    }
  } catch (err) {
    res.status(500).json({
      error: "Failed to delete section",
      details: err.message,
    });
  }
};
