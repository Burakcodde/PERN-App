const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('pern_app', 'pern_user', 'password', {
  host: 'localhost',
  dialect: 'postgres',
  logging: console.log, // Hata ayıklama için logging ekleyin
});

module.exports = { sequelize };