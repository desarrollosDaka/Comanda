const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterPayment, 
    filterMasterPayment}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/payment.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user

router.get("/masterPayment", getMasterPayment);
// Filter user
router.get("/filterPayment/:id", filterMasterPayment);

// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






