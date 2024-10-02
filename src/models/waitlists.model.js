// models/Waitlist.js

module.exports = (sequelize, DataTypes) => {
  const Waitlist = sequelize.define('Waitlist', {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: 255,
      },
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        max: 255,
      },
    },
  });

  return Waitlist;
};
