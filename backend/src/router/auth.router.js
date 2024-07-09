const router = require("express").Router();

const {singIn, signUp} = require("../controllers/auth.controller");


//const { checkAuth } = require("../middleware/auth"); // Importa tu middleware

// register user es daniel alo
router.post("/signup", signUp);

// Login
router.post("/login", singIn);

module.exports = router;






