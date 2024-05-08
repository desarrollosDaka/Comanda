const sequelize = require("../config/conexion");

// get user
const getMasterRoles = async (req, res) => {
    try {
        const rta = await sequelize.models.modelRol.findAll();
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
const filterMasterRoles = async (req, res) => {
    try {
        const id = req.params.ID_rol; 
        const rta = await sequelize.models.modelRol.findOne({
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

// // update user
// const updateMasterUser = async (req, res) => {
//     try {
//         const idUser = req.params.ID_user;
//         const userUpdate = req.body;
//         const rta = await sequelize.models.modelRol.update(userUpdate,{
//             where: {id: idUser},
//           });

//         if(rta){
//             res.status(200)
//             res.json(rta)
//         }else{
//             res.status(404)
//             res.json({msj: 'Error en la consulta'})
//         } 

//     } catch (e) {
//         console.log('Error', e);
//     }
// }

// // delete user
// const deleteMasterUser = async (req, res) => {
//     try {
//         const idUser = req.params.ID_user;
//         const rta = await sequelize.models.modelRol.destroy({where: { id: idUser }});

//         if(rta){
//             return res.status(200).rta
//         }else{
//             return res.status(404).rta.json({msj: 'Error en la consulta'})
//         } 

//     } catch (e) {
//         console.log('Error', e); 
//     }
// };

// Export controllers
module.exports = {
    getMasterRoles,
    filterMasterRoles,
    // updateMasterUser,
    // deleteMasterUser
};
