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

module.exports = router;






