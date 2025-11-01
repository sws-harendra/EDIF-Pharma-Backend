"use strict";

module.exports = (sequelize, DataTypes) => {
  const CSRSustainability = sequelize.define(
    "CSRSustainability",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      headerId: { type: DataTypes.INTEGER, allowNull: false },

      title: { type: DataTypes.STRING, allowNull: false }, // "CSR / Sustainability"
      subtitle: { type: DataTypes.STRING }, // optional smaller heading
      description: { type: DataTypes.TEXT }, // main body text

      bannerImage: { type: DataTypes.STRING }, // photo of community/environment
      learnMoreText: { type: DataTypes.STRING }, // "Learn More"
      learnMoreLink: { type: DataTypes.STRING }, // link URL

      // Initiatives as JSON array
      // Example:
      // [
      //   { "title": "Community Health Drive", "photo": "/uploads/drive.jpg", "year": 2023, "story": "Provided free medical camps in rural areas" },
      //   { "title": "Green Manufacturing", "photo": "/uploads/green.jpg", "year": 2024, "story": "Reduced CO2 emissions by 30%" }
      // ]
      initiatives: { type: DataTypes.JSON, allowNull: true },

      order: { type: DataTypes.INTEGER, defaultValue: 1 },
      enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "csr_sustainability",
      timestamps: true,
    }
  );

  CSRSustainability.associate = (models) => {
    CSRSustainability.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
      onDelete: "CASCADE",
    });
  };

  return CSRSustainability;
};
