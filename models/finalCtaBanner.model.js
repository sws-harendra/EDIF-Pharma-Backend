"use strict";

module.exports = (sequelize, DataTypes) => {
  const FinalCTABanner = sequelize.define(
    "FinalCTABanner",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      title: { type: DataTypes.STRING, allowNull: false }, // "Ready to Partner with Us?"
      subtitle: { type: DataTypes.TEXT }, // "Contact us today to discuss your pharmaceutical needs."

      // background settings
      gradientStart: { type: DataTypes.STRING, defaultValue: "#007BFF" }, // blue default
      gradientEnd: { type: DataTypes.STRING, defaultValue: "#00C853" }, // green default
      backgroundImage: { type: DataTypes.STRING, allowNull: true }, // optional background image

      // button 1: Request a Quote
      quoteButtonText: {
        type: DataTypes.STRING,
        defaultValue: "Request a Quote",
      },
      quoteButtonLink: { type: DataTypes.STRING, allowNull: true },
      quoteButtonPopup: { type: DataTypes.BOOLEAN, defaultValue: false },

      // button 2: Download Catalog
      catalogButtonText: {
        type: DataTypes.STRING,
        defaultValue: "Download Product Catalog",
      },
      catalogFile: { type: DataTypes.STRING, allowNull: true }, // file upload URL

      order: { type: DataTypes.INTEGER, defaultValue: 1 },
      enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "final_cta_banners",
      timestamps: true,
    }
  );

  return FinalCTABanner;
};
