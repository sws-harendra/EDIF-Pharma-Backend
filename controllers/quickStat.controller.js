const db = require("../models");

// Create one or multiple stats
exports.createQuickStats = async (req, res) => {
  try {
    const { headerId, stats } = req.body;

    if (!headerId) {
      return res.status(400).json({ message: "headerId is required" });
    }

    let createdStats = [];

    // support multiple card creation
    if (Array.isArray(stats)) {
      createdStats = await db.QuickStat.bulkCreate(
        stats.map((s, i) => ({
          ...s,
          order: s.order ?? i,
          headerId,
        }))
      );
    } else {
      const single = await db.QuickStat.create({
        ...req.body,
        headerId,
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

// Fetch all stats for a header
exports.getQuickStatsByHeader = async (req, res) => {
  try {
    const { headerId } = req.params;

    const stats = await db.QuickStat.findAll({
      where: { headerId },
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

// Update a stat (edit or toggle visibility)
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

// Reorder cards
exports.reorderQuickStats = async (req, res) => {
  try {
    const { order } = req.body; // e.g. [{ id: 1, order: 0 }, { id: 2, order: 1 }]

    if (!Array.isArray(order))
      return res.status(400).json({ message: "Invalid order format" });

    const updatePromises = order.map(({ id, order }) =>
      db.QuickStat.update({ order }, { where: { id } })
    );

    await Promise.all(updatePromises);
    res.json({ message: "Order updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to reorder quick stats",
      details: error.message,
    });
  }
};
