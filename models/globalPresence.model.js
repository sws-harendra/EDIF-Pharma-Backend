"use strict";

module.exports = (sequelize, DataTypes) => {
  const GlobalPresence = sequelize.define(
    "GlobalPresence",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      headerId: { type: DataTypes.INTEGER, allowNull: false },

      title: { type: DataTypes.STRING, allowNull: false }, // "Global Presence"
      subtitle: { type: DataTypes.STRING }, // "Trusted pharmaceutical partner..."

      exportSummary: { type: DataTypes.STRING }, // "Exporting to 45+ Countries Worldwide"
      description: { type: DataTypes.TEXT }, // "Building global healthcare partnerships since 1998"

      // Regions data as JSON
      // Example:
      // [
      //   {
      //     region: "Africa",
      //     countries: [
      //       { name: "Nigeria", tooltip: "Key partner since 2010", users: 1240 },
      //       { name: "Kenya", tooltip: "Top growth market", users: 830 }
      //     ],
      //     totalCountries: 15,
      //     growthPercent: 25
      //   },
      //   { region: "Europe", countries: [...], totalCountries: 18, growthPercent: 18 }
      // ]
      regions: { type: DataTypes.JSON, allowNull: true },

      backgroundImage: { type: DataTypes.STRING }, // optional background
      analyticsOverlay: { type: DataTypes.JSON }, // optional: aggregated analytics per country

      order: { type: DataTypes.INTEGER, defaultValue: 1 },
      enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "global_presences",
      timestamps: true,
    }
  );

  GlobalPresence.associate = (models) => {
    GlobalPresence.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
      onDelete: "CASCADE",
    });
  };

  return GlobalPresence;
};
