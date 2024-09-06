const sequelize = require("../config/conexion");

// get user
const getMasterPayment = async (req, res) => {
    try {
        const rta = await sequelize.models.modelPayment.findAll();
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
const filterMasterPayment = async (req, res) => {
    try {
        const id = req.params.ID_Payment; 
        const rta = await sequelize.models.modelPayment.findOne({
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
    getMasterPayment,
    filterMasterPayment,

};
