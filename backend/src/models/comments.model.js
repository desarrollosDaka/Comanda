//  TABLA EO_PERSONA- PERSONAS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_COMMENTS";
const modelName = "modelMasterComments"; 

const masterCommentsSchema = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doc_id:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  messeger:{
    allowNull: true,
    type: DataTypes.STRING(300),
  },
  estatus: {
    type: DataTypes.STRING(70),
    allowNull: true,
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

class MasterComments extends Model {
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
  masterCommentsSchema,
  MasterComments
};
