const jwt = require('jsonwebtoken');
require("dotenv").config();

// Genera el token

const tokenSign = async (user) => {
    return jwt.sign(
        {
            id: user.id,
            role: user.user_rol,
            usuario: user.user_name
        },
        process.env.JWT_SECRET,
        {
            expiresIn: "1h"
        }
    )
}

const verifyToken = async (token) => {
    try {
        return jwt.verify(token, process.env.JWT_SECRET)
    } catch(e){
        return null
    }
}

module.exports = {
    tokenSign, verifyToken
}