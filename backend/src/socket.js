const { Server } = require("socket.io");
const {
  getMasterOrder,
  createMasterOrderAndDetails,
  updateMasterOrderAndDetails,
  getMasterOrderRetencion,
} = require("./controllers/orders.controller.js");
const { getMasterUser } = require("./controllers/user.controller.js");
const { latestNoti, findallv2 } = require("./controllers/notifications.controllers.js");

module.exports = (server) => {
  const io = new Server(server, {
    cors: {
      origin: "*", // Reemplaza con la URL de tu frontend
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

  io.on("connection", (socket) => {
    // console.log("Nuevo cliente conectado");

    const emitOrderData = async () => {
      try {
        const rta = await getMasterOrder();
        socket.emit("get-master-order", rta);
        //console.log('Datos emitidos:', rta);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    const emitOrderDataConRetencion = async () => {
      try {
        const rta = await getMasterOrderRetencion();
        socket.emit("get-master-order-retencion", rta);
        //console.log('Datos emitidos:', rta);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    const emitUserData = async () => {
      try {
        const rta = await getMasterUser();
        socket.emit("get-master-user", rta);
        //console.log('Datos emitidos:', rta);
      } catch (error) {
        console.error("Error al obtener los datos:", error);
      }
    };

    // Notificaciones
    socket.on("getUser",async  (userId) => {
      const rta = await findallv2(userId.ID_user);
      socket.emit("notifications", rta[0]);
    });

    // const emitNotify = async () => {
    //     try {
    //         const rta = await findallv2("10");
    //         socket.emit('get-master-notify', rta);
    //         console.log('Datos emitidos:', rta);
    //     } catch (error) {
    //         console.error('Error al obtener los datos:', error);
    //     }
    // };

    // Emitir evento cuando se actualiza una orden
    // const updateOrderAndEmit = async (orderData) => {
    //     try {
    //         await updateMasterOrderAndDetails(orderData);
    //         const updatedOrders = await getMasterOrder();
    //         io.emit('update-master-order', updatedOrders);
    //     } catch (error) {
    //         console.error('Error al actualizar la orden:', error);
    //     }
    // };
    // Emitir datos inmediatamente al conectar
    // emitOrderData();
    // emitUserData();
    // emitOrderDataConRetencion();
    // emitNotify();

    // Configurar un intervalo para emitir datos cada 10 segundos (por ejemplo)
    const intervalIdOrder = setInterval(emitOrderData, 5000);
    const intervalIdUser = setInterval(emitUserData, 5000);
    const intervalIdOrderRetencion = setInterval(
      emitOrderDataConRetencion,
      5000
    );
    // const intervalNotifications = setInterval(emitNotify, 5000);

    // Escuchar eventos específicos para emitir datos
    socket.on("request-master-order", emitOrderData);
    socket.on("request-master-user", emitUserData);
    socket.on("request-master-order-retencion", emitOrderDataConRetencion);
    // socket.on('request-master-notifications', emitNotify);

    // Escuchar evento de actualización de orden
    // socket.on('update-master-order', updateOrderAndEmit);

    // Notificaciones

    socket.on("newCommand", (idUser) => {
      try {
        // const notifications = await latestNoti(idUser);
        socket.emit("lol", "rta");
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    });

    // Te devuelvo lo que tu me envies.
    // socket.on("nuevaComanda", (datos) => {
    //   try {
    //     const a = socket.emit("nuevaComanda", datos);
    //   } catch (error) {
    //     console.log(error);
    //   }
    // });

    // setInterval(() => {
    //     // socket.emit("lol", "rta");
    //     socket.emit("nuevaComanda", "6");
    //     console.log("s");
    // }, 1000);

    // -- by power:Alice

    socket.on("disconnect", () => {
      //   console.log("Cliente desconectado");
      clearInterval(intervalIdOrder); // Limpiar el intervalo cuando el cliente se desconecta
      clearInterval(intervalIdUser); // Limpiar el intervalo cuando el cliente se desconecta
      clearInterval(intervalIdOrderRetencion); // Limpiar el intervalo cuando el cliente se desconecta
      // clearInterval(intervalNotifications); // Limpiar el intervalo cuando el cliente se desconecta
    });
  });

  return io;
};
