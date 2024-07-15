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
        const ID_municipio = req.params.id; 
        const rta = await sequelize.query(
            `SELECT 
                    T1.*
        FROM [dbo].[MASTER_MUNICIPALITY] T0
        INNER JOIN [dbo].[MASTER_CITIES] T1 ON T0.ID_municipio = T1.ID_municipio
        WHERE T0.ID_municipio = '${ID_municipio}'`);
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
