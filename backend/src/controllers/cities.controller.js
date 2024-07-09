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
        const ID_state = req.params.id; 
        const rta = await sequelize.query(
            `SELECT 
                    T1.*
        FROM [dbo].[MASTER_STATES] T0
        INNER JOIN [dbo].[MASTER_CITIES] T1 ON T0.ID_states = T1.ID_states
        WHERE T0.ID_states = '${ID_state}'`);
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
