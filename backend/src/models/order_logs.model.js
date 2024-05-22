// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "ORDERS_LOGS";
const modelName = "modelOrdersLogs";

const masterOrderLogsSchema = {
  ID_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_order: {
    type: DataTypes.INTEGER,
   // autoIncrement: true,
  },
  ID_status: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  User_crea: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  User_asing: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
 

};

class MasterOrdersLogs extends Model {
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
  masterOrderLogsSchema,
  MasterOrdersLogs,
};
