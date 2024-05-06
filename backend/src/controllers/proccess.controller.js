const sequelize = require("../config/conexion");

// get documents
const getMasterDocuments = async (req, res) => {
    try {
        const rta = await sequelize.models.modelMasterProccess.findAll();
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
// get codes
const getProccess = async (req, res) => {
        try {
            const rta = await sequelize.query(`SELECT letters + ' - ' + name AS 'proccessAll', letters FROM [dbo].[MASTER_PROCCESS]`);
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
const getTypes = async (req, res) => {
        try {
            const rta = await sequelize.query(`SELECT letters + ' - ' + name AS 'typesAll', letters FROM [dbo].[MASTER_TYPES]`);
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
    getProccess,
    getTypes
};
 