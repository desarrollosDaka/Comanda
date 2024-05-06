const cors = require("cors");
const express = require("express");
const morgan = require("morgan");
const app = express();
// rutas
const routerUsers = require("../router/user.router");
const routerDocuments = require("../router/documentos.router");
const routerAuth = require("../router/auth.router");
const routerProccess = require("../router/proccess.router");
const routerComments = require("../router/comments.router");

// Middlewares
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

app.use("/api/users", routerUsers);
app.use("/api/proccess", routerProccess);
app.use("/api/documents", routerDocuments);
app.use("/api/comments", routerComments);
app.use("/api/auth", routerAuth);

module.exports = app;
