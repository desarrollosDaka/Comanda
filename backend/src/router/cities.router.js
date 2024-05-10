const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterCities, 
    filterMasterCities}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/cities.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterCities", getMasterCities);
// Filter user
router.get("/filterCities/:id", filterMasterCities);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






