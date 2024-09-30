const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define(
  'Bootcamp',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
    firstName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    phoneNumber: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
    },
    course: {
      type: DataTypes.STRING(255),
      allowNull: false,
    }
  }
);


module.exports = User;