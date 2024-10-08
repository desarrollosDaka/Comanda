const sequelize = require("../config/conexion");



//CONSULTA DE ORDERS DETAILS

// get Clients
const getMasterOrderDetails = async (req, res) => {
    try {
        const id = req.params.id; 
        const rta = await sequelize.models.modelOrdersdetails.findAll({
                where: {
                    ID_detalle : id,
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



//CONSULTA DE ORDENES
const getMasterOrder = async (req, res) => {
    try {
       // const rta = await sequelize.models.modelOrders.findAll();
       const rta = await sequelize.query(
        `SELECT T0.[ID_order]
                ,T0.ID_detalle
               ,T0.[Cedula] Cedula
               ,T3.Nombre Cliente
               ,T1.Sucursal
               ,T0.[User_crea]
               ,T0.[User_asing] Asesor 
               ,T2.Status
               ,CAST(T0.Create_date AS DATE) Create_date
        FROM [COMANDA_TEST].[dbo].[ORDERS] T0
        INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.ID_sucursal = T1.ID_sucursal
        INNER JOIN [COMANDA_TEST].[dbo].[MASTER_STATUS] T2 ON T2.ID_status = T0.ID_status
        INNER JOIN [dbo].[MASTER_CLIENTS] T3 ON T0.Cedula = T3.Cedula`);
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


//FILTRAR ORDENES POR ID
const filterMasterOrder = async (req, res) => {
    try {
        const id = req.params.id; 
        // const rta = await sequelize.models.modelOrders.findOne({
        //     where: {
        //         id : id,
        //     }, 
        // });
        const rta = await sequelize.query(
            `SELECT DISTINCT	 
                    T0.[ID_order]
                    ,T0.ID_detalle
                    ,T0.Cedula
                    ,T3.Tipo_cliente
                    ,T3.Email
                    ,T3.Nombre AS Cliente
                    ,T3.Direccion
                    ,T1.ID_sucursal AS Sucursal
                    ,T4.ID_states AS Estado
                    ,T5.ID_city AS Ciudad
                    ,T6.ID_municipio AS Municipio
                    ,t0.[ID_pago]
                    ,t0.[User_crea]
                    ,t0.[User_mod]
                    ,t0.[User_asing]
                    ,t0.[User_rol]
                    ,t0.[ID_status]
                    ,t0.[Tipo_delivery]
                    ,t0.[Personal_autoriza]
                    ,t0.[Cedula_autoriza]
                    ,T3.[Telefono]
                    ,t0.[Retencion]
                    ,t0.[Porc_retencion]
                    ,t0.[File_cedula]
                    ,t0.[File_pago]
                    ,t0.[File_retencion]
                    ,t0.[File_factrura]
                    ,t0.[File_despacho]
                    ,t0.[File_ordeVenta]
                    ,t0.[Delete]
                    ,t0.[Motivo_delete]	
                    ,T2.Status
                    ,CAST(T0.Create_date AS DATE) Create_date
                    ,CAST(T0.[update_date] AS DATE) [Update_date]
            FROM [COMANDA_TEST].[dbo].[ORDERS] T0
            INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.ID_sucursal = T1.ID_sucursal 
            INNER JOIN [COMANDA_TEST].[dbo].[MASTER_STATUS] T2 ON T2.ID_status = T0.ID_status
            INNER JOIN [dbo].[MASTER_CLIENTS] T3 ON T0.Cedula = T3.Cedula
            INNER JOIN [dbo].[MASTER_STATES] T4 ON T1.ID_state = T4.ID_states
            INNER JOIN [dbo].[MASTER_CITIES] T5 ON T1.ID_city = T5.ID_city 
            INNER JOIN [dbo].[MASTER_MUNICIPALITY] T6 ON T3.ID_municipio = T6.ID_municipio
            WHERE T0.ID_detalle = '${id}'`);
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

//CREAR CABECERA ORDENES Y CLIENTES
const createMasterOrderAndDetails = async (req, res) => {
    try {
        const data = req.body
       // const fileNombre = req.file.filename
        //console.log(fileNombre);

        const newClients = {
            Nombre: data.nombreCompleto,
            Email: data.email,
            Cedula: data.cedulaUno,
            Direccion: data.direccion,
            Telefono: data.telefonoUno,
            ID_state: data.estado,
            ID_city: data.ciudad,
            ID_municipio: data.municipio,
            Tipo_cliente: data.tipo,                                                               
        };

        const newOrder = {
            ID_sucursal: data.origen,
            Cedula: data.cedulaUno,      
            ID_pago: data.ID_pago,
            User_crea: data.user_crea,
            User_rol: 'Admin',
            ID_status: data.ID_status,
            Tipo_delivery: data.ID_delivery,
            Autoriza: data.P_autorizado,
            Personal_autoriza: data.autorizado,
            Cedula_autoriza: data.cedulaDos,      
            Retencion: data.retencion,
            Porc_retencion: data.porcentaje,
            File_cedula: req.file.filename 
        };
       
        // Comprueba si la cédula ya existe en la base de datos
        let client = await sequelize.models.modelMasterClients.findOne({ where: { Cedula: data.cedulaUno } });
        if (client) {
            // Actualiza el cliente existente
            client = await client.update(newClients);
        } else {
            // Crea un nuevo cliente
            client = await sequelize.models.modelMasterClients.create(newClients);
        }

        const order = await sequelize.models.modelOrders.create(newOrder);

        if(order && client){
            res.status(201)

            res.json({order: order, clients: client, orderDetails: orderDetails})
        }else{
            res.status(404)
            res.json({msj: 'Error en la creación'})
        } 


    } catch (e) {
        console.log('Error', e);
    }
};


//CREAR DETALLES DE ORDENES 
const createOrderDetails = async (req, res) => {
    const data = req.body

    try {
    const orderDetailData ={         
            ID_detalle: data.Id_Comanda,
            ID_producto: data.id_producto,
            Producto: data.producto,
            Unidades: data.unidades,
            Precio: data.precio,
            Subtotal:data.subtotal,

        };
    const orderDetails = await sequelize.models.modelOrdersdetails.create(orderDetailData);
    
    if( orderDetailData){
        res.status(201)

        res.json({orderDetails: orderDetails})
    }else{
        res.status(404)
        res.json({msj: 'Error en la creación'})} 
    }  catch (e) {
        console.log('Error', e);
    }
}

//EDITAR CABECERA ORDENES Y CLIENTES
const updateMasterOrderAndDetails = async (req, res) => {
    
    try {
       
        const data = req.body  
        const idOrder = req.params.id;
       // const fileNombre = req.file.filename

        const newClients = {
            Nombre: data.nombreCompleto,
            Email: data.email,
            Cedula: data.cedulaUno,
            Direccion: data.direccion,
            Telefono: data.telefonoUno,
            ID_state: data.estado,
            ID_city: data.ciudad,
            ID_municipio: data.municipio,
            Tipo_cliente: data.tipo,                                                               
        };

        const UpdateOrder = {
            ID_sucursal: data.origen,
            Cedula: data.cedulaUno,      
            ID_pago: data.ID_pago,
            User_crea: data.user_crea,
            User_rol: 'Admin',
            ID_status: data.ID_status,
            Tipo_delivery: data.ID_delivery,
            Autoriza: data.P_autorizado,
            Personal_autoriza: data.autorizado,
            Cedula_autoriza: data.cedulaDos,      
            Retencion: data.retencion,
            Porc_retencion: data.porcentaje 
        };
       
        // Comprueba si la cédula ya existe en la base de datos
        let client = await sequelize.models.modelMasterClients.findOne({ where: { Cedula: data.cedulaUno } });
        if (client) {
            // Actualiza el cliente existente
            client = await client.update(newClients);
        } else {
            // Crea un nuevo cliente
            client = await sequelize.models.modelMasterClients.create(newClients);
        }


        const order = await sequelize.models.modelOrders.update(UpdateOrder,{
            where: {ID_detalle: idOrder},
          });

        if(order && client ){
            res.status(201)

            res.json({order: order, clients: client})
        }else{
            res.status(404)
            res.json({msj: 'Error en la creación'})
        } 


    } catch (e) {
        console.log('Error', e);
    }
};


//FILTRO DE ASESOR 
const filterMasterAsesor = async (req, res) => {
    try {
        const rta = await sequelize.query(
            `SELECT [ID_user]
                   ,[Nombre]
            FROM [COMANDA_TEST].[dbo].[MASTER_USER]
            WHERE Nombre_rol = 'Asesor'`);
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

//UPDATE ASESOR ASIGNADO A COMANDA 
const updateMasterAsesor = async (req, res) => {
    try {

        const User_asing = req.params.User_asing;
        const idUser = req.params.ID_order;
       // const userUpdate = req.body;
        const rta = await sequelize.models.modelOrders.update(User_asing,{
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
// UPDATE ORDER SOLO CABECERA (DESACTIVADO)
// const updateMasterOrder = async (req, res) => {
//     try {
//         const idUser = req.params.ID_order;
//         const userUpdate = req.body;
//         const rta = await sequelize.models.modelOrders.update(userUpdate,{
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

// UPDATE DEL DETALLE DE LA ORDER
const updateMasterOrderDetails = async (req, res) => {
    try {
        const idUser = req.params.ID_detalle;
        const userUpdate = req.body;
        const rta = await sequelize.models.modelOrdersdetails.update(userUpdate,{
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

// // DELETE ORDER
const deleteMasterOrder = async (req, res) => {
    try {
        const Delete = 1;
        const Motivo = req.params.motivo
        const idOrder = req.params.ID_order;
        
       // const userUpdate = req.body;
        const rta = await sequelize.models.modelOrders.update(Delete, Motivo ,{
            where: {id: idOrder},
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
};

// const deleteMasterOrder = async (req, res) => {
//     try {
//         const idUser = req.params.ID_order;
//         const rta = await sequelize.models.modelOrders.destroy({where: { id: idUser }});

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
    getMasterOrder,
    filterMasterOrder,
    filterMasterAsesor,
    createOrderDetails,
    createMasterOrderAndDetails,
    updateMasterOrderAndDetails,
    updateMasterOrderDetails,
    updateMasterAsesor,
    //updateMasterOrder,
    deleteMasterOrder,
    getMasterOrderDetails
};