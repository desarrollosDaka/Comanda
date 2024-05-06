const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterUser, 
    filterMasterUser, 
    updateMasterUser, 
    deleteMasterUser} 
= require("../controllers/user.controller");

// Middleware
const {checkAuth} = require("../middleware/auth");
const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterUser", getMasterUser);
// Filter user
router.get("/filterUser/:id", filterMasterUser);
// Update user
router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






