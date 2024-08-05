const sequelize = require("../config/conexion");

// get user
const getMasterStatus = async (req, res) => {
    try {
        const rta = await sequelize.models.modelStatus.findAll();
        if(rta){
            res.status(201)
            res.json(rta)
        }else{
            res.status(404)
            res.json({msj: 'Error en la consulta'})
        }   
    } catch (e) {
        console.log('Error', e);
    }
};

// Export controllers
module.exports = {
    getMasterStatus,
};
