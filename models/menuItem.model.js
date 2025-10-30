"use strict";

module.exports = (sequelize, DataTypes) => {
  const MenuItem = sequelize.define(
    "MenuItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      url: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      order: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      parentId: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      headerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "menu_items",
      timestamps: true,
    }
  );

  MenuItem.associate = (models) => {
    // Belongs to header
    MenuItem.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
    });

    // Self-reference: parent → children
    MenuItem.hasMany(models.MenuItem, {
      foreignKey: "parentId",
      as: "subItems",
      onDelete: "CASCADE",
    });

    // Self-reference: child → parent
    MenuItem.belongsTo(models.MenuItem, {
      foreignKey: "parentId",
      as: "parent",
    });
    MenuItem.hasMany(models.SubMenu, {
      foreignKey: "menuItemId",
      as: "subMenus",
      onDelete: "CASCADE",
    });
  };

  return MenuItem;
};
