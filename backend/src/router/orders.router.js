
const router = require("express").Router();
const sequelize = require("../config/conexion");
const multer = require('multer')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads')
    },
    filename: function (req, file, cb){

        const { id } = req.params;
        const extension = file.originalname.split('.').pop(); 

        //const nameDocument = `${Date.now()}-${file.originalname}`
        const nameDocument = `${Date.now()}-${id}.${extension}`; //QUE SE guarde el id de la comanda
        cb(null, nameDocument)
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
    updateOrderDetails,
    filterMasterAsesor, 
    filterMasterAsesorSucursal,
    updateMasterAsesor,
    updateStatusOrder,
    //updateMasterOrder,
    deleteMasterOrder,
    deleteOrderDetails,
    //getMasterOrderDetails,
    createOrderDocument,
    filterOrderDetailsFiles,
    deleteOrderDocument,
    getMasterOrderForStore,
    download
} 
= require("../controllers/orders.controller");

// // Middleware
// const {checkAuth} = require("../middleware/auth");
// const {checkRoleAuth} = require("../middleware/roleAuth");r

// Select Order
router.get("/masterOrder", getMasterOrder);

// Filter ORDER + CLIENT
router.get("/filterOrder/:id", filterMasterOrder);

// Filter ORDER For Store
router.get("/filterOrderForSucursal/:id_sucursal", getMasterOrderForStore);

//FILTRO DETALLE ORDER
router.get("/filterOrderDetails/:id", filterOrderDetails);

//filtro de asesor
router.get("/filterMasterAsesor", filterMasterAsesor);///:id_sucursal

//filtro por sucursal asesor
router.get("/filterMasterAsesorSuc/:id_sucursal", filterMasterAsesorSucursal);

//CREAR ORDER + CLIENTE
router.post("/createOrder", createMasterOrderAndDetails);

//CREATE DETALLE DE ORDEN
router.post("/createOrderDetails", createOrderDetails);

//CREATE ARCHIVOS DE ORDER DOCUMENT
router.post("/createOrderDocument/:id/:idComanda", upload.array('doc_file'), createOrderDocument);


//CREATE DETALLE DE ORDEN
router.get("/download/:id", download);

// Update Order(SOLO CABECERA) (DESACTIVADO)
//router.put("/updateOrder/:id", updateMasterOrder);



/////////////////////////////ANDERSON ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////
//UPDATE ORDERS + CLIENTS
router.put("/updateOrder/:id", updateMasterOrderAndDetails);


//FILTRO ORDER FILES
router.get("/filterOrderDetailsfiles/:id", filterOrderDetailsFiles);

/////////////////////////////FIN ///////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////


//UPDATE SOLO CAMPO DE ASESOR ASIGNADO EN CABECERA ORDERS
router.put("/updateOrderAsesor/:id", updateMasterAsesor);

//UPDATE STATUS DE COMANDA
router.put("/updateStatusOrder/:id", updateStatusOrder);

// Update OrderDetails
router.put("/updateOrderDetails/:id", updateOrderDetails);

// DELETE ORDER
//router.delete("/deleteOrder/:id", deleteMasterOrder);
router.put("/deleteOrder/:id", deleteMasterOrder);

//DELETE ORDER DETAILS
router.put("/deleteOrderDetail/", deleteOrderDetails);

//DELETE ARCHIVOS
router.put('/deleteOrderDocument/:id', deleteOrderDocument);

module.exports = router;
