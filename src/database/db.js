const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './waitlist.db',
  logging: false
});

const db_init = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ force: true });
    console.log('Database connection established.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}
db_init();


module.exports = sequelize;