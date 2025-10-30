"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("cta_buttons", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
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
      text: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "Request a Quote",
      },
      color: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "#FF6600",
      },
      link: {
        type: Sequelize.STRING,
        allowNull: false,
        defaultValue: "/quote",
      },
      enabled: {
        type: Sequelize.BOOLEAN,
        defaultValue: true,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
      },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("cta_buttons");
  },
};
