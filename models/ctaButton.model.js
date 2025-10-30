// models/ctaButton.model.js
module.exports = (sequelize, DataTypes) => {
  const CTAButton = sequelize.define(
    "CTAButton",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      headerId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      text: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Request a Quote",
      },
      color: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "#FF6600",
      },
      link: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "/quote",
      },
      enabled: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      tableName: "cta_buttons",
      timestamps: true,
    }
  );

  CTAButton.associate = (models) => {
    CTAButton.belongsTo(models.HeaderSettings, {
      foreignKey: "headerId",
      as: "header",
    });
  };

  return CTAButton;
};
