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

module.exports = { subscription, notification };