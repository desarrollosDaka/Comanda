const {verifyToken} = require("../helpers/generateToken");
const sequelize = require("../config/conexion");


const checkRoleAuth = (roles) => async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        const idUser = tokenData.ID_user
        const userData = await sequelize.models.modelMasterUser.findOne({
            where: {
                id : idUser,
            }, 
        });
        
        if([].concat(roles).includes(userData.ID_rol)){
            next()
        } else {
            res.status(409);
            res.json({ error: 'No tienes permisos'});
        }
    } catch (e) {
        console.log('error')
    }
}

module.exports = {
    checkRoleAuth
}