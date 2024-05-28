const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterMotivo, 
    filterMasterMotivo}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/motivo.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterMotivo", getMasterMotivo);
// Filter user
router.get("/filterMotivo/:id", filterMasterMotivo);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






