const { DataTypes } = require('sequelize');
const sequelize = require('../database/db');

const User = sequelize.define(
  'User',
  {
    id: {
      type: DataTypes.UUID,
      allowNull: false,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4
    },
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
        //isEmail: true,
        max: 255
      }
    },
   /*  bootcampOnly: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    } */
  }
);


module.exports = User;