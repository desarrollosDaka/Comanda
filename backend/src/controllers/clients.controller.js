const sequelize = require("../config/conexion");

// get Clients
const getMasterClients = async (req, res) => {
    try {
        const rta = await sequelize.models.modelMasterClients.findAll();
        
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

// get filter Clients
const filterMasterClients = async (req, res) => {
    try {
        const id = req.params.ID_cliente; 
        const rta = await sequelize.models.modelMasterClients.findOne({
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

// get filter Clients for CI
const filterMasterClientsForCI = async (req, res) => {
    try {
        const CI = req.params.cedula; 
        
    const rta = await sequelize.query(
        `SELECT DISTINCT T0.[ID_cliente]
            ,T0.[Nombre]
            ,T0.[Razon_comercial]
            ,T0.[Tipo_cedula]
            ,T0.[Cedula]
            ,T0.[Email]
            ,T0.[Telefono]
            ,T0.[Direccion]
            ,T0.[Referencia]
            ,T0.[ID_state]
			,T0.ID_city
			,T0.[ID_municipio]
            ,T2.Nombre AS Nombre_city
            ,T1.Nombre AS Nombre_municipio
            ,T0.[Tipo_cliente]
            ,T0.[Retencion]
            ,T0.[Porc_retencion]
            ,T0.[Tipo_cedula_rep]
            ,T0.[Cedula_rep]
            ,T0.[Nombre_rep]
            ,T0.[Email_rep]
            ,T0.[Telefono_rep]
            ,T0.[Direccion_rep]
            ,T0.[Referencia_rep]
            ,T0.[ID_state_rep]
			,ID_city_rep
			,ID_municipio_rep
            ,(select top 1 T1.Nombre FROM [COMANDA_TEST].[dbo].[MASTER_CLIENTS] T0 INNER JOIN [dbo].[MASTER_CITIES] T1 ON T0.ID_city_rep = T1.ID_city WHERE T0.Cedula = '${CI}') as Nombre_city_rep
            ,(select top 1 T1.Nombre FROM [COMANDA_TEST].[dbo].[MASTER_CLIENTS] T0 INNER JOIN [dbo].[MASTER_MUNICIPALITY] T1 ON T0.[ID_state_rep] = T1.ID_municipio WHERE T0.Cedula = '${CI}') as Nombre_municipio_rep
            ,T0.[Delete]
            ,T0.[Create_date]
            ,T0.[Update_date]
        FROM [COMANDA_TEST].[dbo].[MASTER_CLIENTS] T0
        INNER JOIN [dbo].[MASTER_MUNICIPALITY] T1 ON T0.ID_municipio = T1.ID_municipio
        INNER JOIN  [dbo].[MASTER_CITIES] T2 ON T0.ID_city = T2.ID_city 
        WHERE T0.Cedula = '${CI}'`
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
//Create Clients

const createMasterClients = async (req, res) => {
    try {
        
        const newClients = req.body.Clients;
        //const ClientsDetailData = req.body.ClientsDetail;

        const rta = await sequelize.models.modelMasterClients.create(newClients);
       // const rtaClientsDetail = await sequelize.models.modelClientsDetail.create(ClientsDetailData);

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
};



// update Clients
const updateMasterClients = async (req, res) => {
    try {
        const idUser = req.params.ID_cliente;
        const userUpdate = req.body;
        const rta = await sequelize.models.modelMasterClients.update(userUpdate,{
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
const deleteMasterClients = async (req, res) => {
    try {
        const idUser = req.params.ID_cliente;
        const rta = await sequelize.models.modelMasterClients.destroy({where: { id: idUser }});

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
    getMasterClients,
    filterMasterClients,
    createMasterClients,
    updateMasterClients,
    deleteMasterClients, 
    filterMasterClientsForCI
};
