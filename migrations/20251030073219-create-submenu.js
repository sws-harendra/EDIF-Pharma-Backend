"use strict";
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sub_menus", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      label: { type: Sequelize.STRING, allowNull: false },
      url: { type: Sequelize.STRING, allowNull: false },
      order: { type: Sequelize.INTEGER, defaultValue: 0 },
      enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      menuItemId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "menu_items", key: "id" },
        onDelete: "CASCADE",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },
  async down(queryInterface) {
    await queryInterface.dropTable("sub_menus");
  },
};
