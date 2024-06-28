const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const { getMasterStatus } = require("../controllers/status.controller");

// Select user
router.get("/masterStatus", getMasterStatus);

module.exports = router;
