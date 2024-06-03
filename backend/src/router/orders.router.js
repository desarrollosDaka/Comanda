
const router = require("express").Router();
const sequelize = require("../config/conexion");
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){
        cb(null, `${Date.now()}-${file.originalname}`)
    }
})


const upload = multer({ storage: storage })

// Controllers
const {
    getMasterOrder,
    filterMasterOrder,
    filterOrderDetails,
    createMasterOrderAndDetails,
    updateMasterOrderDetails,
    updateMasterOrderAndDetails,
    createOrderDetails,
    filterMasterAsesor, 
    updateMasterAsesor,
    updateStatusOrder,
    //updateMasterOrder,
    deleteMasterOrder,
    deleteOrderDetails,
    getMasterOrderDetails
} 
= require("../controllers/orders.controller");

// // Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");r

// Select Order
router.get("/masterOrder", getMasterOrder);


// Filter ORDER + CLIENT
router.get("/filterOrder/:id", filterMasterOrder);

//FILTRO DETALLE ORDER
router.get("/filterOrderDetails/:id", filterOrderDetails);

//filtro de asesor
router.get("/filterMasterAsesor", filterMasterAsesor);

//CREAR ORDER + CLIENTE
router.post("/createOrder", upload.single('doc_file'), createMasterOrderAndDetails);

//CREATE DETALLE DE ORDEN
router.post("/createOrderDetails", createOrderDetails);

// Update Order(SOLO CABECERA) (DESACTIVADO)
//router.put("/updateOrder/:id", updateMasterOrder);

//UPDATE ORDERS + CLIENTS
router.put("/updateOrder/:id", upload.single('doc_file'), updateMasterOrderAndDetails);

//UPDATE SOLO CAMPO DE ASESOR ASIGNADO EN CABECERA ORDERS
router.put("/updateOrderAsesor/:id", updateMasterAsesor);

//UPDATE STATUS DE COMANDA
router.put("/updateStatusOrder/:id", updateStatusOrder);

// Update OrderDetails
router.put("/updateOrderDetails/:id", updateMasterOrderDetails);

// DELETE ORDER
//router.delete("/deleteOrder/:id", deleteMasterOrder);
router.put("/deleteOrder/:id", deleteMasterOrder);

//DELETE ORDER DETAILS
router.put("/deleteOrderDetail/", deleteOrderDetails);

module.exports = router;
