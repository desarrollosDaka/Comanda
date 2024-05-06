const app = require("./app/app");

const port = process.env.PORT || 3002

app.listen(port, () =>{
    console.log(`-------------- SERVER RUNNING ON PORT ${port} :) -------------------`)
})

// Creamos el servidor HTTPS
// https.createServer(options, app).listen(port, () => {
//     console.log(`-------------- SERVER RUNNING ON PORT ${port} -------------------`)
//   });