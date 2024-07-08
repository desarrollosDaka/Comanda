// USUARIOS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_CITIES";
const modelName = "modelCities";

const masterCitiesSchema = {
  ID_city: {
    allowNull: false,
    primaryKey: true,
    type: DataTypes.INTEGER,
  },
  Nombre: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  ID_states: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },


  
};

class MasterCities extends Model {
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
  masterCitiesSchema,
  MasterCities,
};
