const sequelize = require("../config/conexion");

// get documents
const getComments = async (req, res) => {
    const id = req.params.id
    try {
        const rta = await sequelize.models.modelMasterComments.findAll({
            where: {
                doc_id : id,
            }, 
        });
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
const postComments = async (req, res) => {
    try {
        const newComment = req.body
        // Crear comentario
        const rta = await sequelize.models.modelMasterComments.create(newComment); 
        if(rta) {
            // res.status(404)
            res.json({msj: 'comentario creado'})
        }
  
    } catch (e) {
        console.log('Error', e);
    }
};


// Export controllers
module.exports = {
    getComments,
    postComments
};
 