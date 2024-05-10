const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
// rutas
const routerUsers = require("../router/user.router");
const routerAuth = require("../router/auth.router");
const routerRoles = require("../router/roles.router");
const routerStores = require("../router/stores.router");
const routerStates = require("../router/states.router");
const routerCities = require("../router/cities.router");
const routerMunicipality = require("../router/municipalities.router");
const routerOrders = require("../router/orders.router");
const routerClients = require("../router/clients.router");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/users", routerUsers);
app.use("/api/roles", routerRoles);
app.use("/api/auth", routerAuth);
app.use("/api/stores", routerStores);
app.use("/api/states", routerStates);
app.use("/api/cities", routerCities);
app.use("/api/municipalities", routerMunicipality);
app.use("/api/orders", routerOrders);
app.use("/api/clients", routerClients);

module.exports = app;
