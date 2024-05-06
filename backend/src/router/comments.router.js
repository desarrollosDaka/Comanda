
const router = require("express").Router();
const sequelize = require("../config/conexion");

// Controllers
const {
    getComments,
    postComments} 
= require("../controllers/comments.controller");

// Select documents
router.get("/getComments/:id", getComments);
router.post("/postComments", postComments);

module.exports = router;






