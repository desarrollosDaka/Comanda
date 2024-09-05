const sequelize = require("../config/conexion");

// get user
const getMasterFiles = async (req, res) => {
    try {
        const rta = await sequelize.models.modelFile.findAll();
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
const filterMasterFiles = async (req, res) => {
    try {
        const id = req.params.ID_File; 
        const rta = await sequelize.models.modelFile.findOne({
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
    getMasterFiles,
    filterMasterFiles,

};
