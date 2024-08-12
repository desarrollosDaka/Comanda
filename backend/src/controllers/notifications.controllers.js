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

const findallv2 = async (id) => {
  const response =
    await sequelize.query(`select top 5 t0.* from [dbo].[ORDER_NOTIFICATIONS] t0
  inner join [dbo].[MASTER_USER] t1 on t0.ID_user = t1.ID_user
    WHERE t0.ID_user = '${id}' and t0."Read" = '0'`);
  return response;
};

const latestNoti = async (id) => {
  const response =
    await sequelize.query(`select t0.* from [dbo].[ORDER_NOTIFICATIONS] t0
  inner join [dbo].[MASTER_USER] t1 on t0.ID_user = t1.ID_user
    WHERE t0.ID_user =  '${id}'`);

  return response;
};

const update = async (req, res) => {
  console.log("ssa", req.params.ID_Notifications);
  
  const { ID_Notifications } = req.params;
  const response = await sequelize.models.modelNotifications.update({ Read: true}, { where: {
    ID_Notifications: ID_Notifications
  }});
  res.json(JSON.parse(response));
};

const ruta = (req, res) => {
  res.status(200).json();
};

module.exports = { subscription, notification, ruta, findallv2, latestNoti, update };
