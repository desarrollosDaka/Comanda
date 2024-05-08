// MUNICIPIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "DELIVERY_TYPE";
const modelName = "modelDelivery";

const masterDeliverySchema = {
  ID_Delivery: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Tipo_delivery: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },


  
};

class MasterDelivery extends Model {
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
  masterDeliverySchema,
  MasterDelivery,
};
