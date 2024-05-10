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
        const newOrder = req.body.order;
        const orderDetailData = req.body.orderDetail;

        const rtaOrder = await sequelize.models.modelOrders.create(newOrder);
        const rtaorderDetail = await sequelize.models.modelorderDetail.create(orderDetailData);

        if(rtaOrder && rtaorderDetail){
            res.status(201)
            res.json({order: rtaOrder, orderDetail: rtaorderDetail})
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
    updateMasterOrder,
    deleteMasterOrder
};
