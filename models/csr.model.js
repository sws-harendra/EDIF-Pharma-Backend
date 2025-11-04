"use strict";
module.exports = (sequelize, DataTypes) => {
  const Csr = sequelize.define(
    "Csr",
    {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      title: { type: DataTypes.STRING, allowNull: false },
      description: { type: DataTypes.STRING },
      buttontitle: { type: DataTypes.STRING },
      buttonredirect: { type: DataTypes.STRING },
    },
    {
      tableName: "csr",
      timestamps: true,
    }
  );

  Csr.associate = (models) => {
    Csr.hasMany(models.CsrStat, { foreignKey: "csrId", as: "stats" });
  };

  return Csr;
};
