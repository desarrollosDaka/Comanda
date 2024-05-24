const { Sequelize } = require("sequelize");
require("dotenv").config();
const setupModels = require("../models/index");

const sequelize = new Sequelize(
  process.env.BD_NOMBRE,
  process.env.DB_USER,
  process.env.BD_PASSWORD,
  
  {
    host: process.env.DB_HOST,
    dialect: 'mssql',
    dialectOptions: {
      options: {
        // Your tedious options here
        encrypt: false,
      }
    }
  }
);

setupModels(sequelize);
 //sequelize.sync();  

module.exports = sequelize;

  // PRUEBA DE CONEXIOn
  // async function testConnection() {
  //   try {
  //       await sequelize.authenticate();
  //       console.log('Connection Establecida correctamente.');
  //   } catch (error) {
  //       console.error('Todo Mal', error);
  //   }
  // }
  // testConnection();
