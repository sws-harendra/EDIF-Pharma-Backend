"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // Remove headerId column if it exists
    const tableInfo = await queryInterface.describeTable("csr_sustainability");

    if (tableInfo.headerId) {
      await queryInterface.removeColumn("csr_sustainability", "headerId");
      console.log("✅ Removed column 'headerId' from quick_stats");
    } else {
      console.log("⚠️ Column 'headerId' does not exist — skipping");
    }
  },

  async down(queryInterface, Sequelize) {
    // Add it back if you rollback
    await queryInterface.addColumn("csr_sustainability", "headerId", {
      type: Sequelize.INTEGER,
      allowNull: true,
      references: {
        model: "header_settings",
        key: "id",
      },
      onDelete: "CASCADE",
    });
  },
};
