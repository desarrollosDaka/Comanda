const cors = require("cors");
const express = require("express");
// const morgan = require("morgan");
// const http = require("http");
const https = require("https");
const fs = require("fs");
const socketIOInitializer = require('../socket.js'); 
const app = express();
const path = require('path');
// const server = http.createServer(app);
const server = https.createServer({
    key: fs.readFileSync("././ssl/code.key"),
    cert: fs.readFileSync("././ssl/code.crt"),
},app);
const io = socketIOInitializer(server);

// Middlewares
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
// app.use(morgan("dev"));

const routerUsers = require("../router/user.router");
const routerAuth = require("../router/auth.router");
const routerRoles = require("../router/roles.router");
const routerStores = require("../router/stores.router");
const routerStates = require("../router/states.router");
const routerCities = require("../router/cities.router");
const routerMunicipality = require("../router/municipalities.router");
const routerOrders = require("../router/orders.router");
const routerClients = require("../router/clients.router");
const routerMotivo = require("../router/motivo.router");
const routerDelivery = require("../router/delivery.router");
const routerPayment = require("../router/payment.router");
const routerProducts = require("../router/products.router");
const routerStatus = require("../router/status.router");
const routerNotifications = require("../router/notifications.router");

///////////////////////////////////////////DOCUMENTOS///////////////////////////////
app.use(express.urlencoded({ extended: true}));
app.use('/public', express.static(path.join(__dirname, '../../uploads')));
app.use('/public', express.static(path.join(__dirname, '../../imagesWatermark')));

app.use("/api/users", routerUsers);
app.use("/api/roles", routerRoles);
app.use("/api/auth", routerAuth);
app.use("/api/stores", routerStores);
app.use("/api/states", routerStates);
app.use("/api/cities", routerCities);
app.use("/api/municipalities", routerMunicipality);
app.use("/api/orders", routerOrders);
app.use("/api/clients", routerClients);
app.use("/api/motivo", routerMotivo);
app.use("/api/delivery", routerDelivery);
app.use("/api/payment", routerPayment);
app.use("/api/products", routerProducts);
app.use("/api/status", routerStatus);
app.use("/api/", routerNotifications);
app.use('/', require('../socket.js'));

module.exports = { app, server , io};

