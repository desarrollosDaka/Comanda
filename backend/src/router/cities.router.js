const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const { getMasterCities,   filterMasterCities}= require("../controllers/cities.controller");

// Middleware
// const {checkRoleAuth} = require("../middleware/roleAuth");

// Select user
router.get("/masterCities", getMasterCities);
// Filter user
router.get("/filterCities/:id",  filterMasterCities);

module.exports = router;






