const db = require("../models");

exports.createHeroSection = async (req, res) => {
  try {
    const {
      bannerImage,
      backgroundVideo,
      headline,
      subheadline,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      animationType,
      headerId,
    } = req.body;

    const hero = await db.HeroSection.create({
      bannerImage,
      backgroundVideo,
      headline,
      subheadline,
      primaryCtaText,
      primaryCtaLink,
      secondaryCtaText,
      secondaryCtaLink,
      animationType,
      headerId,
    });

    res.status(201).json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to create hero section",
      details: error.message,
    });
  }
};

exports.getHeroSectionByHeader = async (req, res) => {
  try {
    const { headerId } = req.params;

    const hero = await db.HeroSection.findOne({
      where: { headerId },
      include: [{ model: db.HeaderSettings, as: "header" }],
    });

    if (!hero) return res.status(404).json({ message: "Not found" });

    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to fetch hero section",
      details: error.message,
    });
  }
};

exports.updateHeroSection = async (req, res) => {
  try {
    const { id } = req.params;

    const hero = await db.HeroSection.findByPk(id);
    if (!hero) return res.status(404).json({ message: "Not found" });

    await hero.update(req.body);
    res.json(hero);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: "Failed to update hero section",
      details: error.message,
    });
  }
};
