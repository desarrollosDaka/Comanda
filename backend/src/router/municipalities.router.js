const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterMunicipality, 
    filterMasterMunicipality}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/municipalities.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterMunicipality", getMasterMunicipality);
// Filter user
router.get("/filterMunicipality/:id", filterMasterMunicipality);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






