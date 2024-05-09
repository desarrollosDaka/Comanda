const sequelize = require("../config/conexion");

// get user
const getMasterUser = async (req, res) => {
    try {
        const rta = await sequelize.models.modelMasterUser.findAll();
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
const filterMasterUser = async (req, res) => {
    try {
        const id = req.params.id;
        const rta = await sequelize.models.modelMasterUser.findOne({
            where: {
                ID_user : id,
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

// update user
const updateMasterUser = async (req, res) => {
    try {
        const idUser = req.params.id;
        const userUpdate = req.body;
        console.log(userUpdate)
        console.log(idUser)
        const rta = await sequelize.models.modelMasterUser.update(userUpdate,{
            where: {
                ID_user: idUser},
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

// delete user
const deleteMasterUser = async (req, res) => {
    try {
        
        const id = req.params.id
        const dataUpdate = {
            Delete: req.body.Delete,
        };
        console.log(dataUpdate);
    
    
        const rta = await sequelize.models.modelMasterUser.update(dataUpdate,{where: { ID_user: id }});
        
        if(rta){
            res.status(200).json(rta);
        }else{
            res.status(404).json({msj: 'Error en la consulta'});
        }
    } catch (e) {
        console.log('Error', e);
    }
};

// Export controllers
module.exports = {
    getMasterUser,
    filterMasterUser,
    updateMasterUser,
    deleteMasterUser
};
