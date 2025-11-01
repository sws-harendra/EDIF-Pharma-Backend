const db = require("../models");

// ✅ Create one or multiple stats
exports.createQuickStats = async (req, res) => {
  try {
    const { stats } = req.body;

    let createdStats = [];

    if (Array.isArray(stats)) {
      createdStats = await db.QuickStat.bulkCreate(
        stats.map((s, i) => ({
          ...s,
          order: s.order ?? i,
        }))
      );
    } else {
      const single = await db.QuickStat.create({
        ...req.body,
      });
      createdStats.push(single);
    }

    res.status(201).json(createdStats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create quick stats",
      details: error.message,
    });
  }
};

// ✅ Fetch all stats
exports.getAllQuickStats = async (req, res) => {
  try {
    const stats = await db.QuickStat.findAll({
      order: [["order", "ASC"]],
    });
    res.json(stats);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch quick stats",
      details: error.message,
    });
  }
};

// ✅ Update a single stat
exports.updateQuickStat = async (req, res) => {
  try {
    const { id } = req.params;
    const stat = await db.QuickStat.findByPk(id);

    if (!stat) return res.status(404).json({ message: "Stat not found" });

    await stat.update(req.body);
    res.json(stat);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update stat",
      details: error.message,
    });
  }
};

// ✅ Reorder stats
exports.reorderQuickStats = async (req, res) => {
  try {
    const { order } = req.body; // e.g. [{ id: 1, order: 0 }, { id: 2, order: 1 }]

    if (!Array.isArray(order))
      return res.status(400).json({ message: "Invalid order format" });

    const updates = order.map(({ id, order }) =>
      db.QuickStat.update({ order }, { where: { id } })
    );

    await Promise.all(updates);
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to reorder quick stats",
      details: error.message,
    });
  }
};

// ✅ Delete a stat
exports.deleteQuickStat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.QuickStat.destroy({ where: { id } });

    if (!deleted) return res.status(404).json({ message: "Stat not found" });

    res.json({ message: "Stat deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to delete stat",
      details: error.message,
    });
  }
};
