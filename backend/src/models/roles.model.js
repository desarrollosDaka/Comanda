// MUNICIPIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_ROLS";
const modelName = "modelRol";

const masterRolSchema = {
  ID_rol: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Nombre_rol: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },


  
};

class MasterRol extends Model {
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
  masterRolSchema,
  MasterRol,
};
