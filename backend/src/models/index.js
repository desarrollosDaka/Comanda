
// const { masterDocumentsSchema, MasterDocuments } = require("./maestroDocumentos.model");
 
// const { masterProccessSchema, MasterProccess } = require("./proccess.model")
// const { mastertypesSchema, MasterTypes } = require("./types.model")
// const { masterCommentsSchema, MasterComments } = require("./comments.model")
// const { masterNotificationsSchema, MasterNotifications } = require("./notification.model")
const { masterUserSchema, MasterUser } = require("./user.model")
const { masterOrderSchema, MasterOrders } = require("./order.model")
const { masterOrderdetailsSchema, MasterOrdersdetails } = require("./order_details.model")
const { masterOrderLogsSchema, MasterOrdersLogs } = require("./order_logs.model")


function setupModels(sequelize) {

 // MasterDocuments.init(masterDocumentsSchema, MasterDocuments.config(sequelize));
  MasterUser.init(masterUserSchema, MasterUser.config(sequelize));
 // MasterProccess.init(masterProccessSchema, MasterProccess.config(sequelize));
 // MasterTypes.init(mastertypesSchema, MasterTypes.config(sequelize));
 // MasterComments.init(masterCommentsSchema, MasterComments.config(sequelize));
 // MasterNotifications.init(masterNotificationsSchema, MasterNotifications.config(sequelize));
  MasterOrders.init(masterOrderSchema, MasterOrders.config(sequelize));
  MasterOrdersdetails.init(masterOrderdetailsSchema, MasterOrdersdetails.config(sequelize));
  MasterOrdersLogs.init(masterOrderLogsSchema, MasterOrdersLogs.config(sequelize));


}

module.exports = setupModels;
