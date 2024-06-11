// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "ORDERS_FILES";
const modelName = "modelOrdersFiles";

const masterOrderFilesSchema = {
  ID_File: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_detalle: {
    allowNull: true,
    type: DataTypes.STRING(30),
  },
  File: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  Type_File: {
    allowNull: true,
    type: DataTypes.STRING(50)
  },
  User_crea: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
 /* File_pago: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  File_retencion: {
    allowNull: true,
    type: DataTypes.STRING(100),
  }, 
  File_factrura: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  File_despacho: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  File_ordeVenta: {
    allowNull: true,
    type: DataTypes.STRING(100),
  }, */
  

};

class MasterOrdersFiles extends Model {
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
  masterOrderFilesSchema,
  MasterOrdersFiles,
};