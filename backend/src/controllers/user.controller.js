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
          WHERE [Delete] = 0`);
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
        const id = req.params.ID_user; 
        const rta = await sequelize.models.modelMasterUser.findOne({
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

// update user
const updateMasterUser = async (req, res) => {
    try {
        const idUser = req.params.ID_user;
        const userUpdate = req.body;
        const rta = await sequelize.models.modelMasterUser.update(userUpdate,{
            where: {id: idUser},
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
        const idUser = req.params.ID_user;
        const rta = await sequelize.models.modelMasterUser.destroy({where: { id: idUser }});

        if(rta){
            return res.status(200).rta
        }else{
            return res.status(404).rta.json({msj: 'Error en la consulta'})
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
