// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "master_clients";
const modelName = "modelMasterClients";

const master_clientsSchema = {
  ID_cliente: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING(70),
  },  
  Cedula: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  Email: {
    allowNull: false,
    type: DataTypes.STRING(120),
  },
  Telefono: {
    allowNull: false,
    type: DataTypes.STRING(13),
  },
  Direccion: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },
  ID_state: {    
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  ID_city: {    
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  ID_municipio: {    
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  Tipo_cliente: {
    allowNull: false,
    type: DataTypes.BOOLEAN,
  },
  Retencion: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  Delete: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
};

class Master_clients extends Model {
  static associate() {
    // associate
  }  

  static config(sequelize) {
    return {
      sequelize,
      tableName: tableName,
      modelName: modelName,
      createdAt: "create_date",
      updatedAt: "update_date"
    };    
  }
}

module.exports = {
  tableName,
  master_clientsSchema,
  Master_clients,
};
