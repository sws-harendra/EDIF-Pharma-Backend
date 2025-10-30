"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("menu_items", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      label: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      url: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      // Self-referencing foreign key for submenus
      parentId: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "menu_items",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      // Link to header
      headerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "header_settings",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.fn("NOW"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("menu_items");
  },
};
