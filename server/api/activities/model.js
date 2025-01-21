const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // baza de date

const Activity = sequelize.define('Activity', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,  // Se generează automat oricum, dar e bine sa fie specificat ca am avut probleme cu foregin key
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  date: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  accessCode: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
  },
});

// Activity.hasMany(require('../feedback/feedbackModel'), { foreignKey: 'activityId' });


module.exports = Activity;
