"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("csr_sustainability", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      headerId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: "header_settings", key: "id" },
        onDelete: "CASCADE",
      },
      title: { type: Sequelize.STRING, allowNull: false },
      subtitle: { type: Sequelize.STRING },
      description: { type: Sequelize.TEXT },
      bannerImage: { type: Sequelize.STRING },
      learnMoreText: { type: Sequelize.STRING },
      learnMoreLink: { type: Sequelize.STRING },
      initiatives: { type: Sequelize.JSON },
      order: { type: Sequelize.INTEGER, defaultValue: 1 },
      enabled: { type: Sequelize.BOOLEAN, defaultValue: true },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("csr_sustainability");
  },
};
