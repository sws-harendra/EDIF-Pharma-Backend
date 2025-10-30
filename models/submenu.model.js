module.exports = (sequelize, DataTypes) => {
  const SubMenu = sequelize.define(
    "SubMenu",
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
      menuItemId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      tableName: "sub_menus",
      timestamps: true,
    }
  );

  SubMenu.associate = (models) => {
    SubMenu.belongsTo(models.MenuItem, {
      foreignKey: "menuItemId",
      as: "parentMenu",
    });
  };

  return SubMenu;
};
