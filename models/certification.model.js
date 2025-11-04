module.exports = (sequelize, DataTypes) => {
  const Certification = sequelize.define("Certification", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image_url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  });

  return Certification;
};
