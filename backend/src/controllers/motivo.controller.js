const sequelize = require("../config/conexion");

// get userotivo
const getMasterMotivo = async (req, res) => {
    try {
        const rta = await sequelize.models.modelMotivo.findAll();
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
const filterMasterMotivo = async (req, res) => {
    try {
        const id = req.params.ID_Motivo; 
        const rta = await sequelize.models.modelMotivo.findOne({
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
    getMasterMotivo,
    filterMasterMotivo,
};
