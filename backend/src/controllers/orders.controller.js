const sequelize = require("../config/conexion");

// get Order
const getMasterOrder = async (req, res) => {
    try {
        const rta = await sequelize.models.modelOrders.findAll();
        
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
           // Retencion:
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

        };
        // const orderDetailData ={
            
        //     ID_detalle: data.Id_Comanda,
        //     cedulaUno: data.cedulaUno,
        //     email: data.email,
        //     nombreCompleto: data.nombreCompleto,
        //     // ... otros campos relacionados con el cliente
        // };


        const rtaOrder = await sequelize.models.modelOrders.create(newOrder);
        //const rtaorderDetail = await sequelize.models.modelorderDetail.create(orderDetailData);
        const rtaclients = await sequelize.models.modelMasterClients.create(newClients);

        if(rtaOrder  && rtaclients){ //&& rtaorderDetail
            res.status(201)
            res.json({order: rtaOrder, 
                //orderDetail: rtaorderDetail, 
                clients: newClients})
        }else{
            res.status(404)
            res.json({msj: 'Error en la creación'})
        } 

    } catch (e) {
        console.log('Error', e);
    }
};



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
    createMasterOrderAndDetails,
    updateMasterOrderDetails,
    updateMasterOrder,
    deleteMasterOrder
};
