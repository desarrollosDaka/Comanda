const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterUser, 
    filterMasterUser,
    //filterMasterAsesor, 
    updateMasterUser, 
    deleteMasterUser} 
= require("../controllers/user.controller");

// Middleware
const {checkAuth} = require("../middleware/auth");
const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterUser", getMasterUser);
// router.get("/filterMasterAsesor", filterMasterAsesor);
// Filter user
router.get("/filterUser/:id", filterMasterUser);
// Update user
router.put("/updateUser/:id", updateMasterUser);
router.put("/deleteUser/:id", deleteMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
// router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






