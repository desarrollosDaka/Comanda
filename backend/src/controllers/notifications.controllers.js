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
    message,
  });
  res.status(200).json();
  try {
    await webpush.sendNotification(pushSubscription, payload);
  } catch (error) {
    console.error(error);
  }
};

const findall = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await sequelize.models.modelNotifications.findAll({
      where: { ID_user: id },
    });
    if (response === null) {
      res.json({ error: true, data: null });
    } else if (response != null) {
      let notipush = [];
      //   Promise.all(
      response.forEach((obj) => {
        notipush.push(obj.dataValues);
      });
      //   );
      res.json({ error: false, data: notipush });
    } else {
      console.error("Dato no contemplado.");
    }
  } catch (error) {
    console.error(error.message);
    res.json({ error: true, data: null });
  }
};

const ruta = (req, res) => {
  res.status(200).json();
};


module.exports = { subscription, notification, findall, ruta };

