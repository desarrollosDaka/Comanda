//  TABLA EO_PERSONA- PERSONAS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_TYPES";
const modelName = "modelMasterTypes"; 

const mastertypesSchema = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  letters:{
    allowNull: false,
    type: DataTypes.STRING(10),
  },
  name:{
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  user_crea: {
    type: DataTypes.STRING(70),
    allowNull: true,
  },
  user_mod: {
    type: DataTypes.STRING(70), 
    allowNull: true,
  }
};

class MasterTypes extends Model {
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
  mastertypesSchema,
  MasterTypes
};
