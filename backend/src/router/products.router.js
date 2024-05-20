const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getMasterProducts,
    filterMasterProducts}
    //updateMasterUser, 
   // deleteMasterUser} 
= require("../controllers/products.controller");

// Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterProducts", getMasterProducts);
// Filter user
router.get("/filterProducts/:id", filterMasterProducts);
// Update user
//router.put("/updateUser/:id", updateMasterUser);
// Delete user
// router.delete("/deleteUser/:id", checkAuth, deleteMasterUser);
//router.delete("/deleteUser/:id", deleteMasterUser);

module.exports = router;






