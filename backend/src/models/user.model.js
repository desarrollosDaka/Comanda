// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_USER";
const modelName = "modelMasterUser";

const masterUserSchema = {
  ID_user: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING(120),
  },
  Email: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Password: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Id_sucursal: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
   ID_rol: {
    allowNull: true,
    type: DataTypes.STRING(80),
  },
  Nombre_rol: {
    allowNull: false,
    type: DataTypes.STRING(80),
  },
  Dpto_ventas: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Linea_ventas: {
    allowNull: true,
    type: DataTypes.STRING(80),
  },
  User_crea: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  User_mod: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  Delete: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },

};

class MasterUser extends Model {
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
  masterUserSchema,
  MasterUser,
};
