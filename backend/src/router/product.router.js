const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterProduct, 
    filterMasterRoles}
= require("../controllers/product.controller");

// Select user
router.get("/replicaProduct", getMasterProduct);
// Filter user
router.get("/filterReplicaProduct/:sku", filterMasterRoles);

module.exports = router;






