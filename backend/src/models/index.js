
const { masterUserSchema, MasterUser } = require("./user.model")
const { masterOrderSchema, MasterOrders } = require("./order.model")
const { masterOrderdetailsSchema, MasterOrdersdetails } = require("./order_details.model")
const { masterOrderFilesSchema, MasterOrdersFiles } = require("./orderFiles.model")
const { masterProductsSchema, MasterProducts } = require("./products_replica.model")
const { masterClientsSchema, Master_clients } = require("./master_clients.model")
const { masterStoresSchema, MasterStores } = require("./stores.model")
const { masterStatesSchema, MasterStates } = require("./states.model")
const { masterCitiesSchema, MasterCities } = require("./cities.model")
const { masterMotivoSchema, MasterMotivo } = require("./motivos.model")
const { masterMunicipalitiesSchema, MasterMunicipalities } = require("./municipalities.model")
const { masterPaymentSchema, MasterPayment } = require("./payment.model") 
const { masterStatusSchema, MasterStatus } = require("./master_status.model") 
const { masterDeliverySchema, MasterDelivery } = require("./delivery_type.model") 
const { masterRolSchema, MasterRol } = require("./roles.model") 


function setupModels(sequelize) {

  MasterUser.init(masterUserSchema, MasterUser.config(sequelize));
  MasterOrders.init(masterOrderSchema, MasterOrders.config(sequelize));
  MasterOrdersdetails.init(masterOrderdetailsSchema, MasterOrdersdetails.config(sequelize));
  MasterOrdersFiles.init(masterOrderFilesSchema, MasterOrdersFiles.config(sequelize));
  MasterProducts.init(masterProductsSchema, MasterProducts.config(sequelize));
  Master_clients.init(masterClientsSchema, Master_clients.config(sequelize));
  MasterStores.init(masterStoresSchema, MasterStores.config(sequelize));
  MasterStates.init(masterStatesSchema, MasterStates.config(sequelize));
  MasterCities.init(masterCitiesSchema, MasterCities.config(sequelize));
  MasterMotivo.init(masterMotivoSchema, MasterMotivo.config(sequelize));
  MasterMunicipalities.init(masterMunicipalitiesSchema, MasterMunicipalities.config(sequelize));
  MasterPayment.init(masterPaymentSchema, MasterPayment.config(sequelize));
  MasterStatus.init(masterStatusSchema, MasterStatus.config(sequelize));
  MasterDelivery.init(masterDeliverySchema, MasterDelivery.config(sequelize));
  MasterRol.init(masterRolSchema, MasterRol.config(sequelize));
 

}

module.exports = setupModels;
