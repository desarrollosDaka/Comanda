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
  Tipo_cedula: {
    allowNull: false,
    type: DataTypes.STRING(15),
  },
  Cedula: {
    allowNull: false,
    type: DataTypes.STRING(100),
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
  Referencia: {
    allowNull: false,
    type: DataTypes.STRING(100),
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
  Tipo_cedula_rep: {
    allowNull: true,
    type: DataTypes.STRING(15),
  },
  Cedula_rep: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  Nombre_rep: {
    allowNull: true,
    type: DataTypes.STRING(70),
  },
  Email_rep: {
    allowNull: true,
    type: DataTypes.STRING(120),
  },
  Telefono_rep: {
    allowNull: true,
    type: DataTypes.STRING(13),
  },
  Direccion_rep: {
    allowNull: true,
    type: DataTypes.STRING(150),
  },
  Referencia_rep: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  Delete: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
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
