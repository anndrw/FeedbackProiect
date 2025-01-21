const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('mydb', 'root', 'andrei11', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize.authenticate()
  .then(() => console.log('Conexiune la baza de date reușită!'))
  .catch((err) => console.error('Eroare la conexiunea cu baza de date:', err));

module.exports = sequelize;
