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
          include: [{ model: db.SubMenu, as: "subMenus" }],
        },
        { model: db.CTAButton, as: "ctaButton" },
      ],
      order: [
        [{ model: db.MenuItem, as: "menuItems" }, "order", "ASC"],
        [
          { model: db.MenuItem, as: "menuItems" },
          { model: db.SubMenu, as: "subMenus" },
          "order",
          "ASC",
        ],
      ],
    });

    if (!header) return res.status(404).json({ message: "Header not found" });

    res.json(header);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch header",
      details: error.message,
    });
  }
};
exports.getHeader = async (req, res) => {
  try {
    const header = await db.HeaderSettings.findOne({
      include: [
        {
          model: db.MenuItem,
          as: "menuItems",
          include: [{ model: db.SubMenu, as: "subMenus" }],
        },
        { model: db.CTAButton, as: "ctaButton" },
      ],
      order: [
        [{ model: db.MenuItem, as: "menuItems" }, "order", "ASC"],
        [
          { model: db.MenuItem, as: "menuItems" },
          { model: db.SubMenu, as: "subMenus" },
          "order",
          "ASC",
        ],
      ],
    });

    if (!header) return res.status(404).json({ message: "Header not found" });

    res.json(header);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch header",
      details: error.message,
    });
  }
};

// ✏️ Update Header
exports.updateHeader = async (req, res) => {
  try {
    const { id } = req.params;
    const { logoUrl, stickyHeader, ctaButton, menuItems } = req.body;

    const header = await db.HeaderSettings.findByPk(id);
    if (!header) return res.status(404).json({ message: "Header not found" });

    // Update header info
    await header.update({ logoUrl, stickyHeader });

    // Update or create CTA button
    if (ctaButton) {
      const cta = await db.CTAButton.findOne({ where: { headerId: id } });
      if (cta) {
        await cta.update(ctaButton);
      } else {
        await db.CTAButton.create({ ...ctaButton, headerId: id });
      }
    }

    // Update menus + submenus
    if (Array.isArray(menuItems)) {
      for (let i = 0; i < menuItems.length; i++) {
        const item = menuItems[i];
        const orderValue = i + 1;
        const existing = await db.MenuItem.findByPk(item.id);

        if (existing) {
          await existing.update({
            label: item.label,
            url: item.url,
            order: orderValue,
          });

          // ✅ Update submenus if any
          if (Array.isArray(item.subMenus)) {
            for (let j = 0; j < item.subMenus.length; j++) {
              const sub = item.subMenus[j];
              const subExisting = await db.SubMenu.findByPk(sub.id);
              if (subExisting) {
                await subExisting.update({
                  label: sub.label,
                  url: sub.url,
                  order: j + 1,
                });
              }
            }
          }
        }
      }
    }

    // Re-fetch with proper order
    const updatedHeader = await db.HeaderSettings.findByPk(id, {
      include: [
        { model: db.CTAButton, as: "ctaButton" },
        {
          model: db.MenuItem,
          as: "menuItems",
          include: [{ model: db.SubMenu, as: "subMenus" }],
        },
      ],
      order: [
        [{ model: db.MenuItem, as: "menuItems" }, "order", "ASC"],
        [
          { model: db.MenuItem, as: "menuItems" },
          { model: db.SubMenu, as: "subMenus" },
          "order",
          "ASC",
        ],
      ],
    });

    res.json(updatedHeader);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update header",
      details: error.message,
    });
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
