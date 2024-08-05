const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterClients,
    filterMasterClients,
    createMasterClients,
    updateMasterClients,
    deleteMasterClients,
    filterMasterClientsForCI} 
= require("../controllers/clients.controller");

// // Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select Clients
router.get("/masterClients", getMasterClients);
// Filter Clients
router.get("/filterClients/:id", filterMasterClients);

router.get("/searchClient/:cedula", filterMasterClientsForCI);
//create Clients
router.post("/createClients", createMasterClients);
// Update Clients
router.put("/updateClients/:id", updateMasterClients);
// Delete Clients
router.delete("/deleteClients/:id", deleteMasterClients);

module.exports = router;






