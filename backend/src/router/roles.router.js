const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterRoles, 
    filterMasterRoles}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/roles.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterUser", getMasterRoles);
// Filter user
router.get("/filterUser/:id", filterMasterRoles);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






