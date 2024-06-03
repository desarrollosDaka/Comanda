const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterFiles, 
    filterMasterFiles}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/files.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user

router.get("/masterFiles", getMasterFiles);
// Filter user
router.get("/filterFiles/:id", filterMasterFiles);

// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






