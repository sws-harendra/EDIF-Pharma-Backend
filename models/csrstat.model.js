"use strict";
module.exports = (sequelize, DataTypes) => {
  const CsrStat = sequelize.define(
    "CsrStat",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      csrId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: "csr", // table name
          key: "id",
        },
        onDelete: "CASCADE",
      },
      value: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      label: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "csr_stat",
      timestamps: true,
    }
  );

  CsrStat.associate = (models) => {
    CsrStat.belongsTo(models.Csr, { foreignKey: "csrId", as: "csr" });
  };

  return CsrStat;
};
