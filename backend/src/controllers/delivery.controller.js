const sequelize = require("../config/conexion");

// get user
const getMasterDelivery = async (req, res) => {
    try {
        const rta = await sequelize.models.modelDelivery.findAll();
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
const filterMasterDelivery = async (req, res) => {
    try {
        const id = req.params.ID_Delivery; 
        const rta = await sequelize.models.modelDelivery.findOne({
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
//         const rta = await sequelize.models.modelDelivery.update(userUpdate,{
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
//         const rta = await sequelize.models.modelDelivery.destroy({where: { id: idUser }});

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
    getMasterDelivery,
    filterMasterDelivery,
    // updateMasterUser,
    // deleteMasterUser
};