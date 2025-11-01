"use strict";

module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    "Section",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      headerId: { type: DataTypes.INTEGER, allowNull: false },

      name: { type: DataTypes.STRING, allowNull: false }, // e.g. "Innovation & R&D Excellence"
      description: { type: DataTypes.TEXT }, // long text or intro paragraph

      // store multiple points like:
      // [
      //   { title: "Advanced Analytics", description: "Cutting-edge analytical methods" },
      //   { title: "Process Innovation", description: "Continuous improvement..." }
      // ]
      subheadings: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      ctaText: { type: DataTypes.STRING },
      ctaLink: { type: DataTypes.STRING },

      mediaUrl: { type: DataTypes.STRING }, // can be image or video
      backgroundColor: { type: DataTypes.STRING },
      textColor: { type: DataTypes.STRING },

      order: { type: DataTypes.INTEGER, defaultValue: 1 },
      enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "sections",
      timestamps: true,
    }
  );

  Section.associate = (models) => {
    Section.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
      onDelete: "CASCADE",
    });
  };

  return Section;
};
("use strict");

module.exports = (sequelize, DataTypes) => {
  const Section = sequelize.define(
    "Section",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },

      headerId: { type: DataTypes.INTEGER, allowNull: false },

      name: { type: DataTypes.STRING, allowNull: false }, // e.g. "Innovation & R&D Excellence"
      description: { type: DataTypes.TEXT }, // long text or intro paragraph

      // store multiple points like:
      // [
      //   { title: "Advanced Analytics", description: "Cutting-edge analytical methods" },
      //   { title: "Process Innovation", description: "Continuous improvement..." }
      // ]
      subheadings: {
        type: DataTypes.JSON,
        allowNull: true,
      },

      ctaText: { type: DataTypes.STRING },
      ctaLink: { type: DataTypes.STRING },

      mediaUrl: { type: DataTypes.STRING }, // can be image or video
      backgroundColor: { type: DataTypes.STRING },
      textColor: { type: DataTypes.STRING },

      order: { type: DataTypes.INTEGER, defaultValue: 1 },
      enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
    },
    {
      tableName: "sections",
      timestamps: true,
    }
  );

  Section.associate = (models) => {
    Section.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
      onDelete: "CASCADE",
    });
  };

  return Section;
};
