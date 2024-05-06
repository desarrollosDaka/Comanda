const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getProccess,
    getTypes} 
= require("../controllers/proccess.controller");

// Select documents
router.get("/masterProccess", getProccess);
router.get("/masterTypes", getTypes);

module.exports = router;






