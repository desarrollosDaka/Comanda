const sequelize = require("../config/conexion");

// get Order
const getMasterOrder = async (req, res) => {
    try {
       // const rta = await sequelize.models.modelOrders.findAll();
       const rta = await sequelize.query(
        `SELECT T0.[ID_order]
                ,T0.ID_detalle
               ,T0.[ID_cliente] Cedula
               ,T3.Nombre Cliente
               ,T1.Sucursal
               ,T0.[User_crea]
               ,T0.[User_asing] Asesor 
               ,T2.Status
               ,CAST(T0.Create_date AS DATE) Create_date
       FROM [COMANDA_TEST].[dbo].[ORDERS] T0
       INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.ID_sucursal = T1.ID_sucursal
       INNER JOIN [COMANDA_TEST].[dbo].[MASTER_STATUS] T2 ON T2.ID_status = T0.ID_status
       INNER JOIN [dbo].[MASTER_CLIENTS] T3 ON T0.ID_cliente = T3.Cedula`);
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

// get filter Order
const filterMasterOrder = async (req, res) => {
    try {
        const id = req.params.ID_Order; 
        const rta = await sequelize.models.modelOrders.findOne({
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
//Create Order

const createMasterOrderAndDetails = async (req, res) => {
    try {
        const data = req.body
        const fileNombre = req.file.filename
        console.log(fileNombre);
        console.log(data);
        
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
            ID_detalle: data.Id_Comanda,
            ID_sucursal: data.origen,
            ID_cliente: data.cedulaUno,
            ID_pago: data.ID_pago,
            User_crea: data.user_crea,
            User_rol: 'Admin',
            ID_status: data.ID_status,
            Tipo_delivery: data.ID_delivery,
            Autoriza: data.autorizado,
            Cedula: data.cedulaDos,      
            Retencion: data.retencion,
            Porc_retencion: data.porcentaje,
            File_cedula: req.file.filename //req.file.filename ,
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
       

  
   
        if(order && client && orderDetailData){
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

const createOrderDetails = async (req, res) => {
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
// update Order
const updateMasterOrder = async (req, res) => {
    try {
        const idUser = req.params.ID_order;
        const userUpdate = req.body;
        const rta = await sequelize.models.modelOrders.update(userUpdate,{
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
// update Order
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

// delete user
const deleteMasterOrder = async (req, res) => {
    try {
        const idUser = req.params.ID_order;
        const rta = await sequelize.models.modelOrders.destroy({where: { id: idUser }});

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
    getMasterOrder,
    filterMasterOrder,
    filterMasterAsesor,
    createOrderDetails,
    createMasterOrderAndDetails,
    updateMasterOrderDetails,
    updateMasterAsesor,
    updateMasterOrder,
    deleteMasterOrder
};