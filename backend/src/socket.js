const { Server } = require('socket.io');
const { getMasterOrder, 
        createMasterOrderAndDetails, 
        updateMasterOrderAndDetails,
        getMasterOrderRetencion,
        getMasterOrderRetencionTwo 
    } = require("./controllers/orders.controller.js");
const { getMasterUser } = require("./controllers/user.controller.js");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
          origin: '*', // Reemplaza con la URL de tu frontend
          methods: ['GET', 'POST', 'PUT', 'DELETE'],
          allowedHeaders: ['Content-Type', 'Authorization']
        }
    });

    io.on('connection', (socket) => {
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
        emitOrderDataConRetencionTwo();

        // Configurar un intervalo para emitir datos cada 10 segundos (por ejemplo)
        const intervalIdOrder = setInterval(emitOrderData, 5000);
        const intervalIdUser = setInterval(emitUserData, 5000);
        const intervalIdOrderRetencion = setInterval(emitOrderDataConRetencion, 5000);
        const intervalIdOrderRetencionTwo = setInterval(emitOrderDataConRetencionTwo, 5000);

        // Escuchar eventos específicos para emitir datos
        socket.on('request-master-order', emitOrderData);
        socket.on('request-master-user', emitUserData);
        socket.on('request-master-order-retencion', emitOrderDataConRetencion);
        socket.on('request-master-order-retencion-two', emitOrderDataConRetencionTwo);

        
        // Escuchar evento de actualización de orden
       // socket.on('update-master-order', updateOrderAndEmit);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
           clearInterval(intervalIdOrder); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdUser); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderRetencion); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdOrderRetencionTwo); // Limpiar el intervalo cuando el cliente se desconecta
        });
    });

    return io;
};