const sequelize = require("../config/conexion");

// get user
const getMasterProducts = async (req, res) => {
    try {
        //const rta = await sequelize.models.modelProducts_replica.findAll();
        //
        const id = req.params.id; 
        const rta = await sequelize.query(
            `SELECT [ID_producto]
                ,[Producto]
                ,[Unidades]
                ,[Precio]
                ,[create_date]
                ,[update_date]
            FROM [COMANDA_TEST].[dbo].[PRODUCTS_REPLICA]
            WHERE [Precio] != 0 `);//and [ID_producto] LIKE '%${id}%'

        if (rta) {
            res.status(201)
            res.json(rta)
        } else {
            res.status(404)
            res.json({ msj: 'Error en la consulta' })
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
                id: id,
            },
        });

        if (rta) {
            res.status(200)
            res.json(rta)

        } else {
            res.status(404)
            res.json({ msj: 'Error en la consulta' })
        }

    } catch (e) {
        console.log('Error', e);
    }
}


// Export controllers
module.exports = {
    getMasterProducts,
    filterMasterProducts,
    // updateMasterUser,
    // deleteMasterUser
};
