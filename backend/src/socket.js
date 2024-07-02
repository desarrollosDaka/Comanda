const { Server } = require('socket.io');
const { getMasterOrder } = require("./controllers/orders.controller.js");
const { getMasterUser } = require("./controllers/user.controller.js");

module.exports = (server) => {
    const io = new Server(server, {
        cors: {
          origin: 'http://localhost:5173', // Reemplaza con la URL de tu frontend
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
        emitUserData();

        // Configurar un intervalo para emitir datos cada 10 segundos (por ejemplo)
        const intervalIdOrder = setInterval(emitOrderData, 1500);
        const intervalIdUser = setInterval(emitUserData, 1500);

        socket.on('disconnect', () => {
            console.log('Cliente desconectado');
            clearInterval(intervalIdOrder); // Limpiar el intervalo cuando el cliente se desconecta
            clearInterval(intervalIdUser); // Limpiar el intervalo cuando el cliente se desconecta
        });
    });

    return io;
};