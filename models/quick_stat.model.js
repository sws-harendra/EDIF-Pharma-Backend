"use strict";

module.exports = (sequelize, DataTypes) => {
  const QuickStat = sequelize.define(
    "QuickStat",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: {
        type: DataTypes.STRING, // e.g. "25+", "1000+"
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING, // e.g. "Years of Expertise"
        allowNull: false,
      },
      iconUrl: {
        type: DataTypes.STRING, // icon image path or URL
        allowNull: true,
      },
      color: {
        type: DataTypes.STRING, // optional background/text color
        allowNull: true,
        defaultValue: "#FFFFFF",
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      visible: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      headerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "quick_stats",
      timestamps: true,
    }
  );

  QuickStat.associate = (models) => {
    QuickStat.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
      onDelete: "CASCADE",
    });
  };

  return QuickStat;
};
