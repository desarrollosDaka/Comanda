// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");
const tableName = "ORDERS_PAYMENT";
const modelName = "modelOrdersPay";

const masterOrderPaySchema = {

  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_detalle: {
    allowNull: true,
    type: DataTypes.STRING(30),
  },
  ID_pago: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  User_crea: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },


};

class MasterOrdersPay extends Model {
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
  masterOrderPaySchema,
  MasterOrdersPay,
};
