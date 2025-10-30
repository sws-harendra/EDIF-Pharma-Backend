// models/headerSettings.model.js
module.exports = (sequelize, DataTypes) => {
  const HeaderSettings = sequelize.define(
    "HeaderSettings",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      logoUrl: {
        type: DataTypes.STRING,
        allowNull: true,
      },
      stickyHeader: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "header_settings",
      timestamps: true,
    }
  );

  HeaderSettings.associate = (models) => {
    HeaderSettings.hasMany(models.MenuItem, {
      foreignKey: "headerId",
      as: "menuItems",
      onDelete: "CASCADE",
    });
    HeaderSettings.hasOne(models.CTAButton, {
      foreignKey: "headerId",
      as: "ctaButton",
      onDelete: "CASCADE",
    });
  };

  return HeaderSettings;
};
