// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_STATES";
const modelName = "modelStates";

const masterStatesSchema = {
  ID_states: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING(100),
  }
};

class MasterStates extends Model {
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
  masterStatesSchema,
  MasterStates,
};
