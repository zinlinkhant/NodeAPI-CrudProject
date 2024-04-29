const { DataTypes } = require('sequelize');
const sequelize = require('./database'); 

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  registeredDate: {
    type: DataTypes.DATE,
    allowNull:false
  },
  numberOfDays:{
    type:DataTypes.INTEGER,
    allowNull:false
  }
}, {
  timestamps: true, 
});
sequelize.sync()
  .then(() => {
    console.log('User table created successfully!');
  })
  .catch((err) => {
    console.error('Error creating User table:', err);
  });
module.exports = User;
