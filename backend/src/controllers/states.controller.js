const sequelize = require("../config/conexion");

// get user
const getMasterStates = async (req, res) => {
    try {
        const rta = await sequelize.models.modelStates.findAll();
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
const filterMasterStates = async (req, res) => {
    try {
        const id = req.params.ID_states; 
        const rta = await sequelize.models.modelStates.findOne({
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
    getMasterStates,
    filterMasterStates,

};
