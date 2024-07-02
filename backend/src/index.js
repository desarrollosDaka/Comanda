const { app, server } = require("./app/app");

const port = process.env.PORT || 3002
const port2 = process.env.PORT || 3003

server.listen(port2, () => {
    console.log(`-------------- SOCKET RUNNING ON PORT ${port2} :) -------------------`)
})
app.listen(port, () => {
    console.log(`-------------- SERVER RUNNING ON PORT ${port} :) -------------------`)
})
// Creamos el servidor HTTPS
// https.createServer(options, app).listen(port, () => {
//     console.log(`-------------- SERVER RUNNING ON PORT ${port} -------------------`)
//   });