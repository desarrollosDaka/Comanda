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
    deleteMasterClients
};
