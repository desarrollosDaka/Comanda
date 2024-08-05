const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterDelivery, 
    filterMasterDelivery}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/delivery.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user

router.get("/masterDelivery", getMasterDelivery);
// Filter user
router.get("/filterDelivery/:id", filterMasterDelivery);

// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






