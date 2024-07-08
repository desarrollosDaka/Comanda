const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const { getMasterCities,   filterMasterCities}= require("../controllers/cities.controller");

const { checkAuth } = require("../middleware/auth"); // Importa tu middleware
// Middleware
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterCities", getMasterCities);
// Filter user
router.get("/filterCities/:id", checkAuth, filterMasterCities);

module.exports = router;






