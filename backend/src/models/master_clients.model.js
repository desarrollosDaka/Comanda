// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_CLIENTS";
const modelName = "modelMasterClients";

const masterClientsSchema = {
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
    type: DataTypes.BIGINT,
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
    type: DataTypes.STRING(20),
  },
  Retencion: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  Porc_retencion: {
    type: DataTypes.INTEGER,
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
      createdAt: "Create_date",
      updatedAt: "Update_date"
    };    
  }
}

module.exports = {
  tableName,
  masterClientsSchema,
  Master_clients,
};
