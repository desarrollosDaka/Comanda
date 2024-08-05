// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "PRODUCTS_REPLICA";
const modelName = "modelProducts_replica";

const masterProductsSchema = {
  ID_producto: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.STRING(40),
  },
  Producto: {
    allowNull: false,
    type: DataTypes.STRING(200),
  },
  Unidades: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  Precio: {
    allowNull: false,
    type: DataTypes.FLOAT,
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
