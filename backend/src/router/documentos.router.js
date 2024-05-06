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
  getMasterDocuments,
  filterMasterDocuments,
  postMasterDocuments,
  updateMasterDocuments,
  getCodeDocuments,
  deleteMasterDocuments,
  filterMasterDocumentsForProccess,
  filterMasterDocumentsForCode,
  getDocument,
  updateEstatus, 
  getMasterDocumentsFilter} 
= require("../controllers/documents.controller");

// Middleware
const {checkAuth} = require("../middleware/auth");
const {checkRoleAuth} = require("../middleware/roleAuth");

// Select documents
router.get("/masterDocuments", getMasterDocuments);
router.get("/masterDocumentsFilter", getMasterDocumentsFilter);
// select code
router.get("/codeDocuments", getCodeDocuments);
// Filter documents
router.get("/filterDocuments/:id", filterMasterDocuments);
router.get("/filterDocumentsForProccess/:proccess", filterMasterDocumentsForProccess);
router.get("/filterDocumentsForCode/:code", filterMasterDocumentsForCode);
router.get("/uploads/:documentName", getDocument);
// register documents
router.post("/registerDocuments", upload.single('doc_file'), postMasterDocuments);
// Update documents
router.put("/updateDocuments/:id", upload.single('doc_file') , updateMasterDocuments);

router.put("/updateEstatus/:id" , updateEstatus);
// Delete documents
router.delete("/deleteDocuments/:id", deleteMasterDocuments);

module.exports = router;






