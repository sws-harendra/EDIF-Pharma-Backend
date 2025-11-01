"use strict";

module.exports = (sequelize, DataTypes) => {
  const ContactLead = sequelize.define(
    "ContactLead",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      type: {
        type: DataTypes.ENUM("contact", "quote"),
        allowNull: false,
        defaultValue: "contact",
      },
      name: { type: DataTypes.STRING, allowNull: false },
      company: { type: DataTypes.STRING },
      productInterest: { type: DataTypes.STRING },
      email: { type: DataTypes.STRING, allowNull: false },
      phone: { type: DataTypes.STRING },
      message: { type: DataTypes.TEXT },
      status: {
        type: DataTypes.ENUM("new", "viewed", "responded"),
        defaultValue: "new",
      },
    },
    {
      tableName: "contact_leads",
      timestamps: true,
    }
  );

  return ContactLead;
};
