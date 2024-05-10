// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "ORDERS_DETAILS";
const modelName = "modelOrdersdetails";

const masterOrderdetailsSchema = {
  ID_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_detalle: {
    type: DataTypes.STRING(30),
   // autoIncrement: true,
  },
  ID_producto: {
    allowNull: false,
    type: DataTypes.STRING(60),
  },
  Producto: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Serial: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  Unidades: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Precio: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Delete: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },

};

class MasterOrdersdetails extends Model {
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
  masterOrderdetailsSchema,
  MasterOrdersdetails,
};
