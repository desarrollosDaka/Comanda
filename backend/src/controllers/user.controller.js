const sequelize = require("../config/conexion");

// get user
const getMasterUser = async (req, res) => {
    try {
       // const rta = await sequelize.models.modelMasterUser.findAll();
        const rta = await sequelize.query(
            `SELECT T0.[ID_user]
              ,T0.[Nombre]
              ,T0.[Email]
              ,T0.[Password]
              ,T0.[Id_sucursal]
              ,T1.Sucursal
              ,T0.[Nombre_rol]
              ,T0.[Dpto_ventas]
              ,T0.[Linea_ventas]
              ,T0.[User_crea]
              ,T0.[User_mod]
              ,T0.[Delete]
              ,T0.[Create_date]
              ,T0.[Update_date]
          FROM [COMANDA_TEST].[dbo].[MASTER_USER] T0
          INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.Id_sucursal = T1.ID_sucursal
          WHERE [Delete] = 0 OR  [Delete] IS NULL`);
        if(rta){
           return rta;
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