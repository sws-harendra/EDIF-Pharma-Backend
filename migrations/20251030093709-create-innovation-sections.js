"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("sections", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      headerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "header_settings", key: "id" },
        onDelete: "CASCADE",
      },
      name: { type: Sequelize.STRING, allowNull: false },
      description: { type: Sequelize.TEXT },
      subheadings: { type: Sequelize.JSON },
      ctaText: { type: Sequelize.STRING },
      ctaLink: { type: Sequelize.STRING },
      mediaUrl: { type: Sequelize.STRING },
      backgroundColor: { type: Sequelize.STRING },
      textColor: { type: Sequelize.STRING },
      order: { type: Sequelize.INTEGER, defaultValue: 1 },
      enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("sections");
  },
};
