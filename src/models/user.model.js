const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define(
  'User',
  {
    name: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        max: 255
      }
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
        max: 255
      }
    },
  }
);


module.exports = User;