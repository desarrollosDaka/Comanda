//  TABLA EO_PERSONA- PERSONAS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "MASTER_NOTIFICATION";
const modelName = "modelMasterNotification"; 

const masterNotificationsSchema = {
  id:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  codigo:{
    allowNull: false,
    type: DataTypes.STRING,
  },
  doc_id:{
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  notification:{
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  estatus: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
  user_crea: {
    type: DataTypes.STRING(70), 
    allowNull: true,
  }
};

class MasterNotifications extends Model {
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
  masterNotificationsSchema,
  MasterNotifications
};
