const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterOrder,
    filterMasterOrder,
    createMasterOrderAndDetails,
    updateMasterOrderDetails,
    updateMasterOrder,
    deleteMasterOrder} 
= require("../controllers/orders.controller");

// // Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select Order
router.get("/masterOrder", getMasterOrder);
// Filter Order
router.get("/filterOrder/:id", filterMasterOrder);
//create Order
router.post("/createOrder", createMasterOrderAndDetails);
// Update Order
router.put("/updateOrder/:id", updateMasterOrder);
// Update OrderDetails
router.put("/updateOrderDetails/:id", updateMasterOrderDetails);
// Delete Order
router.delete("/deleteOrder/:id", deleteMasterOrder);

module.exports = router;






