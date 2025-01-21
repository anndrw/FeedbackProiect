const sequelize = require('./config/database');


sequelize.sync({ alter: true })
  .then(() => {
    console.log('Modelele au fost sincronizate cu succes.');
    process.exit(); 
  })
  .catch(error => {
    console.error('Eroare la sincronizarea modelelor:', error);
    process.exit(1); 
  });
