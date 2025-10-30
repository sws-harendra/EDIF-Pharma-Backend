"use strict";

module.exports = (sequelize, DataTypes) => {
  const HeroSection = sequelize.define(
    "HeroSection",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bannerImage: {
        type: DataTypes.STRING, // file path or URL
        allowNull: true,
      },
      backgroundVideo: {
        type: DataTypes.STRING, // video URL
        allowNull: true,
      },
      headline: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      subheadline: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primaryCtaText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      primaryCtaLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secondaryCtaText: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      secondaryCtaLink: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      animationType: {
        type: DataTypes.ENUM("none", "fade", "slide"),
        defaultValue: "none",
      },
      headerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "hero_sections",
      timestamps: true,
    }
  );

  HeroSection.associate = (models) => {
    HeroSection.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
      onDelete: "CASCADE",
    });
  };

  return HeroSection;
};
