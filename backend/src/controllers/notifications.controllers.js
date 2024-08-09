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
    // const response = await sequelize.models.modelNotifications.findAll({
    //   where: { ID_user: id },
    // });
    const response =
      await sequelize.query(`select t0.* from [dbo].[ORDER_NOTIFICATIONS] t0
  inner join [dbo].[MASTER_USER] t1 on t0.ID_user = t1.ID_user
    WHERE t0.ID_user =  '${id}'`);

    //console.log("respnse[0]",response);

    if (response[0] === null) {
      res.json({ error: true, data: null });
    } else if (response[0] != null) {
      let notipush = [];
      //   Promise.all(
      response[0].forEach((obj) => {
        notipush.push(obj);
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
const findallv2 = async (id) => {
  const response =
    await sequelize.query(`select t0.*, t2.User_crea from [dbo].[ORDER_NOTIFICATIONS] t0
  inner join [dbo].[MASTER_USER] t1 on t0.ID_user = t1.ID_user
  inner join [dbo].[ORDERS] t2 on t0.ID_detalle = t2.ID_detalle
    WHERE t0.ID_user = '${id}'`);

  return response;
};

const latestNoti = async (id) => {
  const response =
    await sequelize.query(`select t0.* from [dbo].[ORDER_NOTIFICATIONS] t0
  inner join [dbo].[MASTER_USER] t1 on t0.ID_user = t1.ID_user
    WHERE t0.ID_user =  '${id}'`);

  return response;
};

const ruta = (req, res) => {
  res.status(200).json();
};

module.exports = { subscription, notification, findall, ruta, findallv2, latestNoti };
