// COMANDAS
const { Sequelize, Model, DataTypes } = require("sequelize");

const tableName = "ORDERS";
const modelName = "modelOrders";

const masterOrderSchema = {

  ID_order: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  ID_detalle: {
    allowNull: true, 
    type: DataTypes.STRING(30),
  },
  ID_sucursal: {
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  Cedula: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  ID_pago: {                           
    allowNull: false,
    type: DataTypes.INTEGER,
  },
  User_crea: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  User_mod: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  User_asing: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  User_rol: {
    allowNull: false,
    type: DataTypes.STRING(80),
  },
  ID_status: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  Tipo_delivery: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  SucursalZoom: {
    allowNull: true,
    type: DataTypes.STRING(200),
  },
  Autoriza: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Personal_autoriza: {
    allowNull: true,
    type: DataTypes.STRING(80),
  },
  Cedula_autoriza: {
    allowNull: true,
    type: DataTypes.STRING(100),
  },
  Retencion: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Porc_retencion: {
    allowNull: true,
    type: DataTypes.INTEGER,
  },
  File_cedula: {
    allowNull: true,
    type: DataTypes.STRING(100),
   },
  // File_pago: {
  //   allowNull: true,
  //   type: DataTypes.STRING(100),
  // },
  // File_retencion: {
  //   allowNull: true,
  //   type: DataTypes.STRING(100),
  // }, 
  // File_factrura: {
  //   allowNull: true,
  //   type: DataTypes.STRING(100),
  // },
  // File_despacho: {
  //   allowNull: true,
  //   type: DataTypes.STRING(100),
  // },
  // File_ordeVenta: {
  //   allowNull: true,
  //   type: DataTypes.STRING(100),
  // },  
  Delete: {
    allowNull: true,
    type: DataTypes.BOOLEAN,
  },
  Motivo_delete: {
    allowNull: true,
    type: DataTypes.STRING(80),
  },

};


class MasterOrders extends Model {
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
  masterOrderSchema,
  MasterOrders,
};