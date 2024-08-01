const sequelize = require("../config/conexion");

const webpush = require("../config/webpush");

let pushSubscription;

const subscription = async (req, res) => {
    pushSubscription = req.body;
    res.status(201).json();
};

const notification = async (req, res) => {
    const { message } = req.body;

    const payload = JSON.stringify({
        title: "COMANDA ONLINE",
        message
    });
    res.status(200).json();
    try {
        await webpush.sendNotification(pushSubscription, payload);
    } catch (error) {
        console.error(error);
    }
};

// get user
const getMasterNotifications = async (req, res) => {
    try {
        const rta = await sequelize.models.modelNotifications.findAll();
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


module.exports = { subscription, notification , getMasterNotifications};