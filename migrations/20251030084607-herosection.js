"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("hero_sections", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      bannerImage: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      backgroundVideo: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      headline: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      subheadline: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primaryCtaText: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      primaryCtaLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondaryCtaText: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      secondaryCtaLink: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      animationType: {
        type: Sequelize.ENUM("none", "fade", "slide"),
        defaultValue: "none",
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
    await queryInterface.dropTable("hero_sections");
  },
};
