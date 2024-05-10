const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterStates, 
    filterMasterStates}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/states.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterStores", getMasterStates);
// Filter user
router.get("/filterStores/:id", filterMasterStates);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






