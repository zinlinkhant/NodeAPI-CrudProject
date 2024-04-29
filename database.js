const { Sequelize } = require('sequelize');


const sequelize = new Sequelize('assignment', 'root', '', {
  host: 'localhost', 
  dialect: 'mysql',
});

module.exports = sequelize; 
