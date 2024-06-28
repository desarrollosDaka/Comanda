// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_STATUS";
const modelName = "modelStatus";

const masterStatusSchema = {
  ID_status: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Status: {
    allowNull: false,
    type: DataTypes.STRING(60),
  },
  Descripcion: {
    allowNull: false,
    type: DataTypes.STRING(150),
  },

};

class MasterStatus extends Model {
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
  masterStatusSchema,
  MasterStatus,
};
