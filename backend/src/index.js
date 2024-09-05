const { app, server } = require("./app/app");
const https = require("https");
const fs = require("fs");

var options = {
  key: fs.readFileSync('./ssl/comandadaka.com.key'),
  cert: fs.readFileSync('./ssl/comandadaka.com.crt')
};

const port = process.env.PORT || 3002
const port2 = process.env.PORT || 3003
const portHttps = process.env.PORT || 3004

server.listen(port2, () => {
    console.log(`-------------- SOCKET RUNNING ON PORT ${port2} :) -------------------`)
})

app.listen(port, () => {
    console.log(`-------------- SERVER RUNNING ON PORT ${port} :) -------------------`)
})

// el servidor HTTPS
https.createServer(options, app).listen(portHttps, () => {
    console.log(`-------------- SERVER RUNNING ON PORT ${portHttps} :) -------------------`)
  });
