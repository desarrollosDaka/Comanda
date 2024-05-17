const sequelize = require("../config/conexion");

// get user
const getMasterProduct = async (req, res) => {
    try {
        const rta = await sequelize.models.modelProducts_replica.findAll();
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


// get filter user
const filterMasterRoles = async (req, res) => {
    try {
        const id = req.params.ID_rol; 
        const rta = await sequelize.models.modelRol.findOne({
            where: {
                id : id,
            }, 
        });

        if(rta){
            res.status(200)
            res.json(rta)
        }else{
            res.status(404)
            res.json({msj: 'Error en la consulta'})
        } 

    } catch (e) {
        console.log('Error', e);
    }
}

module.exports = {
    getMasterProduct,
    filterMasterRoles,
    // updateMasterUser,
    // deleteMasterUser
};
