const sequelize = require("../config/conexion");

// get user
const getMasterMunicipality = async (req, res) => {
    try {
        const rta = await sequelize.models.modelMunicipalities.findAll();
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
const filterMasterMunicipality = async (req, res) => {
    try {
        const ID_state = req.params.id; 
        const rta = await sequelize.query(
            `SELECT 
                    T1.*
        FROM [dbo].[MASTER_STATES] T0
        INNER JOIN [dbo].[MASTER_MUNICIPALITY] T1 ON T0.ID_states = T1.ID_states
        WHERE T0.ID_states ='${ID_state}'
        ORDER BY T0.[ID_order] DESC`
        );

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
//         const rta = await sequelize.models.modelMunicipalities.update(userUpdate,{
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
//         const rta = await sequelize.models.modelMunicipalities.destroy({where: { id: idUser }});

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
    getMasterMunicipality,
    filterMasterMunicipality,
    // updateMasterUser,
    // deleteMasterUser
};
