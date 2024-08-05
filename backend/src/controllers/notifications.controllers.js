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
    const response = await sequelize.query(`SELECT DISTINCT TOP (1000) T0.[ID_user]
      ,[Nombre]
      ,[Email]
      ,[Password]
      ,[Id_sucursal]
      ,[ID_rol]
      ,[Dpto_ventas]
      ,[Linea_ventas]
      ,[User_crea]
      ,[User_mod]
      ,[Delete]
      ,T0.[Create_date]
      ,T0.[Update_date]
  FROM [COMANDA_TEST].[dbo].[MASTER_USER] T0
  JOIN [COMANDA_TEST].[dbo].[ORDER_NOTIFICATIONS] T1 ON 
  T0.ID_user = T1.ID_user 
  WHERE T0.ID_user = '${id}'`);
  
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

const ruta = (req, res) => {
  res.status(200).json();
};


module.exports = { subscription, notification, findall, ruta };

