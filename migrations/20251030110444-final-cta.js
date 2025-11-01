"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("final_cta_banners", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      headerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "header_settings", key: "id" },
        onDelete: "CASCADE",
      },
      title: { type: Sequelize.STRING, allowNull: false },
      subtitle: { type: Sequelize.TEXT },
      gradientStart: { type: Sequelize.STRING, defaultValue: "#007BFF" },
      gradientEnd: { type: Sequelize.STRING, defaultValue: "#00C853" },
      backgroundImage: { type: Sequelize.STRING },
      quoteButtonText: {
        type: Sequelize.STRING,
        defaultValue: "Request a Quote",
      },
      quoteButtonLink: { type: Sequelize.STRING },
      quoteButtonPopup: { type: Sequelize.BOOLEAN, defaultValue: false },
      catalogButtonText: {
        type: Sequelize.STRING,
        defaultValue: "Download Product Catalog",
      },
      catalogFile: { type: Sequelize.STRING },
      order: { type: Sequelize.INTEGER, defaultValue: 1 },
      enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("final_cta_banners");
  },
};
