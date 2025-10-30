"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("quick_stats", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      number: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      iconUrl: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      color: {
        type: Sequelize.STRING,
        allowNull: true,
        defaultValue: "#FFFFFF",
      },
      order: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      visible: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
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
    await queryInterface.dropTable("quick_stats");
  },
};
