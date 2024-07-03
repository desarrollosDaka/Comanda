const sequelize = require("../config/conexion");

// get user
const getMasterProducts = async (req, res) => {
    try {
        //const rta = await sequelize.models.modelProducts_replica.findAll();
        //
        const rta = await sequelize.query(
            `SELECT [ID_producto]
                ,[Producto]
                ,[Serial]
                ,[Unidades]
                ,[Precio]
                ,[create_date]
                ,[update_date]
            FROM [COMANDA_TEST].[dbo].[PRODUCTS_REPLICA]
            where [Precio] != 0`);
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
const filterMasterProducts = async (req, res) => {
    try {
        const id = req.params.ID_producto; 
        const rta = await sequelize.models.modelProducts_replica.findOne({
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
//         const rta = await sequelize.models.modelProducts_replica.update(userUpdate,{
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
//         const rta = await sequelize.models.modelProducts_replica.destroy({where: { id: idUser }});

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
    getMasterProducts,
    filterMasterProducts,
    // updateMasterUser,
    // deleteMasterUser
};
