// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "products_replica";
const modelName = "modelProducts_replica";

const masterProductsSchema = {
  ID_producto: {
    allowNull: false,
    primaryKey: true,
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
  Create_date: {
    allowNull: false,
    type: DataTypes.DATE,
  },
  Update_date: {
    allowNull: true,
    type: DataTypes.DATE,
  },

};

class MasterProducts extends Model {
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
  masterProductsSchema,
  MasterProducts,
};
