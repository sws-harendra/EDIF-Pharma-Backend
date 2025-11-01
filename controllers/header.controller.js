const db = require("../models");

// ➕ Create Header
exports.createHeader = async (req, res) => {
  try {
    const { logoUrl, stickyHeader, ctaButton, menuItems } = req.body;

    const header = await db.HeaderSettings.create(
      {
        logoUrl,
        stickyHeader,
        ctaButton: ctaButton ? { ...ctaButton } : undefined,
        menuItems: menuItems?.map((menu) => ({
          ...menu,
          subMenus: menu.subItems ? [...menu.subItems] : [], // 👈 convert key here
        })),
      },
      {
        include: [
          { model: db.CTAButton, as: "ctaButton" },
          {
            model: db.MenuItem,
            as: "menuItems",
            include: [{ model: db.SubMenu, as: "subMenus" }],
          },
        ],
      }
    );

    res.status(201).json(header);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create header",
      details: error.message,
    });
  }
};

// 👀 Get Header
exports.getHeader = async (req, res) => {
  try {
    const header = await db.HeaderSettings.findOne({
      include: [
        {
          model: db.MenuItem,
          as: "menuItems",
          include: [{ model: db.SubMenu, as: "subMenus" }], // ✅ fixed here
        },
        { model: db.CTAButton, as: "ctaButton" },
      ],
    });

    if (!header) return res.status(404).json({ message: "Header not found" });

    res.json(header);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to fetch header", details: error.message });
  }
};

// ✏️ Update Header
exports.updateHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const { logoUrl, stickyHeader, ctaButton } = req.body;

    const header = await db.HeaderSettings.findByPk(id);
    if (!header) return res.status(404).json({ message: "Header not found" });

    await header.update({ logoUrl, stickyHeader });

    if (ctaButton) {
      const cta = await db.CTAButton.findOne({ where: { headerId: id } });
      if (cta) {
        await cta.update(ctaButton);
      } else {
        await db.CTAButton.create({ ...ctaButton, headerId: id });
      }
    }

    const updatedHeader = await db.HeaderSettings.findByPk(id, {
      include: ["ctaButton", "menuItems"],
    });

    res.json(updatedHeader);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to update header", details: error.message });
  }
};

// 🗑️ Delete Header
exports.deleteHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const header = await db.HeaderSettings.findByPk(id);
    if (!header) return res.status(404).json({ message: "Header not found" });

    await header.destroy();
    res.json({ message: "Header deleted successfully" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Failed to delete header", details: error.message });
  }
};
