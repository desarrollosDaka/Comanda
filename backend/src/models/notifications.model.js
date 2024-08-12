

// notifications
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "ORDER_NOTIFICATIONS";
const modelName = "modelNotifications";

const masterNotificationsSchema = {
  ID_Notifications: {
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
    type: DataTypes.INTEGER,
  },
  ID_detalle: {
    allowNull: true,
    type: DataTypes.STRING(30),
  },
  Notifications: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Read: {
    allowNull: true,
    type: DataTypes.BOOLEAN(1),
  },
  ID_user: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  User_crea: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
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
      createdAt: "Create_date",
      updatedAt: "Update_date"
    };    
  }
}

module.exports = {
  tableName,
  masterNotificationsSchema,
  MasterNotifications,

};

