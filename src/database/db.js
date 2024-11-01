'use strict';
require("dotenv").config();
const fs = require('fs');
const path = require('path');
const { Sequelize } = require('sequelize');
const db = {};

const sequelize = process.env.NODE_ENV === 'production' ?
  new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
    dialect: 'mysql'
  }) :
  new Sequelize({
    dialect: 'sqlite',
    storage: ':memory:',
    logging: false
  })

const modelsDir = path.join(__dirname, '../models');

fs
  .readdirSync(modelsDir)
  .filter(file => {
    return file.includes('model')
  })
  .forEach(file => {
    const model = require(path.join(modelsDir, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {

  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


const db_init = async () => {
  try {
    await sequelize.authenticate();
    if (process.env.NODE_ENV !== "production") await sequelize.sync({ alter: true });
    console.log('Database connection established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
};

db_init();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
