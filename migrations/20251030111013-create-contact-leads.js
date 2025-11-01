"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("contact_leads", {
      id: { type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: Sequelize.ENUM("contact", "quote"),
        allowNull: false,
        defaultValue: "contact",
      },
      name: { type: Sequelize.STRING, allowNull: false },
      company: { type: Sequelize.STRING },
      productInterest: { type: Sequelize.STRING },
      email: { type: Sequelize.STRING, allowNull: false },
      phone: { type: Sequelize.STRING },
      message: { type: Sequelize.TEXT },
      status: {
        type: Sequelize.ENUM("new", "viewed", "responded"),
        defaultValue: "new",
      },
      createdAt: { type: Sequelize.DATE, allowNull: false },
      updatedAt: { type: Sequelize.DATE, allowNull: false },
    });
  },

  async down(queryInterface) {
    await queryInterface.dropTable("contact_leads");
  },
};
