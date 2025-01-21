const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // baza de date
const Activity = require('../activities/model'); // modelul la activitate ca sa putem face foreign key

const Feedback = sequelize.define('Feedback', {
  type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  activityId: {
    type: DataTypes.INTEGER,
    references: {
      model: Activity,
      key: 'id',
    },
  },
});

//Feedback.belongsTo(Activity, { foreignKey: 'activityId' });

module.exports = Feedback;