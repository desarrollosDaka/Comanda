const sequelize = require("../config/conexion");

// get user
const getMasterCities = async (req, res) => {
    try {
        const rta = await sequelize.models.modelCities.findAll();
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
const filterMasterCities = async (req, res) => {
    try {
        const id = req.params.ID_city; 
        const rta = await sequelize.models.modelCities.findOne({
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


// Export controllers
module.exports = {
    getMasterCities,
    filterMasterCities,
    // updateMasterUser,
    // deleteMasterUser
};
