// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "PRODUCTS_REPLICA";
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
