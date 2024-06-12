// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_STORES";
const modelName = "modelStores";
// hola
const masterStoresSchema = {
  ID_sucursal: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Sucursal: {
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
  SucursalZoom: {
    allowNull: true,
    type: DataTypes.STRING(200),
  },
  


};

class MasterStores extends Model {
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
  masterStoresSchema,
  MasterStores,
};
