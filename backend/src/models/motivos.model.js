// MUNICIPIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_MOTIVOS";
const modelName = "modelMotivo";

const masterMotivoSchema = {
  ID_motivo: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Motivo: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },


  
};
 
class MasterMotivo extends Model {
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
  masterMotivoSchema,
  MasterMotivo,
};
