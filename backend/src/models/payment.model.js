// MUNICIPIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "PAYMENT_METHODS";
const modelName = "modelPayment";

const masterPaymentSchema = {
  ID_pago: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Pago: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },

};

class MasterPayment extends Model {
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
  masterPaymentSchema,
  MasterPayment,
};
