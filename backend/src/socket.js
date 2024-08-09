
const { Server } = require("socket.io");
const {
  getMasterOrder,
  createMasterOrderAndDetails,
  updateMasterOrderAndDetails,
  getMasterOrderRetencion,
  getMasterOrderRetencionTwo 
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

  io.on('connection', (socket) => {
          // Notificaciones
    socket.on("getUser",async  (userId) => {
      const rta = await findallv2(userId.ID_user);
      socket.emit("notifications", rta[0]);
    });

    // Notificaciones

    socket.on("newCommand", (idUser) => {
      try {
        // const notifications = await latestNoti(idUser);
        socket.emit("lol", "rta");
      } catch (error) {
        console.error("Error fetching notifications:", error);
      }
    });


        console.log('Nuevo cliente conectado');

        const emitOrderData = async () => {
            try {
                const rta = await getMasterOrder();
                socket.emit('get-master-order', rta);
                //console.log('Datos emitidos:', rta);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        const emitOrderDataConRetencion = async () => {
            try {
                const rta = await getMasterOrderRetencion();
                socket.emit('get-master-order-retencion', rta);
                //console.log('Datos emitidos:', rta);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        const emitOrderDataConRetencionTwo = async () => {
            try {
                const rta = await getMasterOrderRetencionTwo();
                socket.emit('get-master-order-retencion-two', rta);
                //console.log('Datos emitidos:', rta);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        const emitOrderDataConPickup = async () => {
            try {
                const rta = await getMasterOrderRetencionTwo();
                socket.emit('get-master-order-retencion-two', rta);
                //console.log('Datos emitidos:', rta);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        const emitUserData = async () => {
            try {
                const rta = await getMasterUser();
                socket.emit('get-master-user', rta);
                //console.log('Datos emitidos:', rta);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        // const emitNotify = async () => {
        //     try {
        //         const rta = await findall();
        //         socket.emit('get-master-notify', rta);
        //         //console.log('Datos emitidos:', rta);
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
        emitOrderData();
        emitUserData();
        emitOrderDataConRetencion();
       // emitNotify();
        emitOrderDataConRetencionTwo();




        // Configurar un intervalo para emitir datos cada 10 segundos (por ejemplo)
        const intervalIdOrder = setInterval(emitOrderData, 5000);
        const intervalIdUser = setInterval(emitUserData, 5000);
        const intervalIdOrderRetencion = setInterval(emitOrderDataConRetencion, 5000);
        //const intervalNotifications = setInterval(emitNotify, 5000);
        const intervalIdOrderRetencionTwo = setInterval(emitOrderDataConRetencionTwo, 5000);

        // Escuchar eventos específicos para emitir datos
        socket.on('request-master-order', emitOrderData);
        socket.on('request-master-user', emitUserData);
        socket.on('request-master-order-retencion', emitOrderDataConRetencion);
      //  socket.on('request-master-notifications', emitNotify);
        socket.on('request-master-order-retencion-two', emitOrderDataConRetencionTwo);


        
        // Escuchar evento de actualización de orden
       // socket.on('update-master-order', updateOrderAndEmit);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
           clearInterval(intervalIdOrder); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdUser); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderRetencion); // Limpiar el intervalo cuando el cliente se desconecta
          //  clearInterval(intervalNotifications); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderRetencionTwo); // Limpiar el intervalo cuando el cliente se desconecta
        });

    });


  return io;
};
