
const { Server } = require("socket.io");
const {
  getMasterOrder,
  getMasterOrderFecha,
  getMasterOrderCDD,
  getMasterOrderForStore,
  getMasterOrderRetencion,
  getMasterOrderRetencionTwo,
  filterOrderPickUp,
  filterOrderPickUpTwo,
  filterOrderATC,
  filterOrderATCOnline,
  getMasterOrderReport,
  getMasterOrderReportFilter
} = require("./controllers/orders.controller.js");
const { getMasterUser,getMasterUserBySuc } = require("./controllers/user.controller.js");
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
    socket.on("getUser",async  (userId, limit) => {
      const rta = await findallv2(userId.ID_user, limit);
      socket.emit("notifications", rta[0]);
    });

    // filter Order Comandas con ID SUC
    socket.on("getComanda",async  (sucId) => {
      //console.log(sucId);
      const rta = await getMasterOrderForStore(sucId);
      socket.emit("get-master-order-suc", rta);
    });

    socket.on("getComandaReporte",async  (sucId) => {
      const rta = await getMasterOrderReport();
      socket.emit("get-master-order-report", rta);
    });

    socket.on("getComandaReporteFilter",async  (id) => {
      const rta = await getMasterOrderReportFilter(id);
      socket.emit("get-master-order-report-filter", rta);
    });
    
    // filter User con ID SUC
    socket.on("getUsuario",async  (sucId) => {
     // console.log(sucId);
      const rta = await getMasterUserBySuc(sucId);
      socket.emit("get-master-user-suc", rta);
    });


    socket.on("getOrderFecha",async  (desde, hasta) => {
      //console.log(desde, hasta);
      jsonDesdeHasta = {
        desde: desde,
        hasta: hasta
      }

      const rta = await getMasterOrderFecha(jsonDesdeHasta);

      socket.emit("get-master-order-fecha", rta);

    });

    socket.on("getOrderPickup",async  (id) => {
     // console.log(sucId);
      const rta = await filterOrderPickUp(id);
      socket.emit("get-master-order-pickup", rta);
    });
    
    socket.on("getOrderPickupTwo",async  (id) => {
     // console.log(sucId);
      const rta = await filterOrderPickUpTwo(id);
      socket.emit("get-master-order-pickup-two", rta);
    });
    
        //console.log('Nuevo cliente conectado');

        const emitOrderData = async () => {
            try {
                const rta = await getMasterOrder();
                socket.emit('get-master-order', rta);
                //console.log('Datos emitidos:', rta);
            } catch (error) {
                console.error('Error al obtener los datos:', error);
            }
        };

        const emitOrderCDDData = async () => {
            try {
                const rta = await getMasterOrderCDD();
                socket.emit('get-master-order-cdd', rta);
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
        //     try {
        //         const rta = await filterOrderPickUp();
        //         socket.emit('get-master-order-pickup', rta);
              
        //     } catch (error) {
        //         console.error('Error al obtener los datos:', error);
        //     }
         };

        const emitOrderDataConPickupTwo = async () => {
          // try {
          //     const rta = await filterOrderPickUpTwo();
          //     socket.emit('get-master-order-pickup-two', rta);
          // } catch (error) {
          //     console.error('Error al obtener los datos:', error);
          // }
        };

        

        //socket.on("getSucursal",async  (userId) => {
       //   console.log("userId "+ userId);

        socket.on("getSucursalATC",async  (userId) => {
          const rta = await filterOrderATC(userId);
          socket.emit("get-master-order-atc", rta[0]);
        });

        socket.on("getComandaATCOnline",async  (userId) => {
       //   console.log("userId "+ userId);
          const rta = await filterOrderATCOnline();
          socket.emit("get-master-atc-online", rta[0]);
        });


        const emitOrderDataATC = async () => {
          // try {
          //     const rta = await filterOrderATC(userId.ID_sucursal);
          //     socket.emit('get-master-order-atc', rta);
          // } catch (error) {
          //     console.error('Error al obtener los datos:', error);
          // }
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

        // Emitir datos inmediatamente al conectar  
        emitOrderData();
        emitOrderCDDData();
        emitUserData();
        emitOrderDataConRetencion();
       // emitNotify();
        emitOrderDataConRetencionTwo();
        emitOrderDataConPickup();
        emitOrderDataConPickupTwo();
        emitOrderDataATC();


        // Configurar un intervalo para emitir datos cada 10 segundos (por ejemplo)
        const intervalIdOrder = setInterval(emitOrderData, 5000);
        const intervalIdOrdercdd = setInterval(emitOrderCDDData, 5000);
        const intervalIdUser = setInterval(emitUserData, 5000);
        const intervalIdOrderRetencion = setInterval(emitOrderDataConRetencion, 5000);
        //const intervalNotifications = setInterval(emitNotify, 5000);
        const intervalIdOrderRetencionTwo = setInterval(emitOrderDataConRetencionTwo, 5000);
        const intervalIdOrderPickup = setInterval(emitOrderDataConPickup, 5000);
        const intervalIdOrderPickupTwo = setInterval(emitOrderDataConPickupTwo, 5000);
        const intervalIdOrderATC = setInterval(emitOrderDataATC, 5000);

        // Escuchar eventos específicos para emitir datos
        socket.on('request-master-order', emitOrderData);
        socket.on('request-master-user', emitUserData);
        socket.on('request-master-order-retencion', emitOrderDataConRetencion);
      //  socket.on('request-master-notifications', emitNotify);
        socket.on('request-master-order-retencion-two', emitOrderDataConRetencionTwo);
        socket.on('request-master-order-pickup', emitOrderDataConPickup);
        socket.on('request-master-order-pickupTwo', emitOrderDataConPickupTwo);
        socket.on('request-master-order-ATC', emitOrderDataATC);
        socket.on('request-master-order-cdd', emitOrderCDDData);


        
        // Escuchar evento de actualización de orden
       // socket.on('update-master-order', updateOrderAndEmit);

        socket.on('disconnect', () => {
            //console.log('Cliente desconectado');
            clearInterval(intervalIdOrder); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdUser); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderRetencion); // Limpiar el intervalo cuando el cliente se desconecta
          //  clearInterval(intervalNotifications); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderRetencionTwo); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderPickup); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderPickupTwo); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderATC); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrdercdd); // Limpiar el intervalo cuando el cliente se desconecta
        });

    });


  return io;
};
