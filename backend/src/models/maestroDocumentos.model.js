//  TABLA EO_PERSONA- PERSONAS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_DOCUMENTS";
const modelName = "modelMasterDocuments"; 

const masterDocumentsSchema = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  doc_cod:{
    allowNull: false,
    type: DataTypes.STRING(70),
  },
  doc_title:{
    allowNull: true,
    type: DataTypes.STRING(70),
  },
  doc_process: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  doc_type: {
    allowNull: false,
    type: DataTypes.STRING(50),
  },
  doc_version: {
    allowNull: false,
    type: DataTypes.STRING(50), 
  },
  approv_date: {
    allowNull: true,
    type: DataTypes.DATE,
  },
  review_date: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  doc_description: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  doc_file: {
    type: DataTypes.STRING(100),
    allowNull: true,  
  },
  doc_status: {
    type: DataTypes.STRING(5),
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

class MasterDocuments extends Model {
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
  masterDocumentsSchema,
  MasterDocuments
};
