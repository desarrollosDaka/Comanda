const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterStores, 
    filterMasterStores}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/stores.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterStores", getMasterStores);
// Filter user
router.get("/filterStores/:id", filterMasterStores);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






