const sequelize = require("../config/conexion");
const path = require('path');

// get documents
const getMasterDocuments = async (req, res) => {
    try {
        const rta = await sequelize.models.modelMasterDocuments.findAll();
        if(rta){
            const rtaFormateada = rta.map(obj => {
                const fecha = new Date(obj.dataValues.approv_date);
                const fechaFormateada = fecha.toISOString().substring(0, 10); // Esto te dará '2024-04-11'
                obj.dataValues.approv_date = fechaFormateada;
                return obj;
            });
            res.status(201)
            res.json(rtaFormateada)
        }else{
            res.status(404)
            res.json({msj: 'Error en la consulta'})
        }   
    } catch (e) {
        console.log('Error', e);
    }
};
// get codes
const getCodeDocuments = async (req, res) => {
    try {
        const rta = await sequelize.query(`select doc_cod from [dbo].[MASTER_DOCUMENTS]`);

        if(rta){
            res.status(201)
            res.json(rta)
        }else{
            res.status(404)
            res.json({msj: 'Error en la consulta'})
        }  

    } catch (e) {
        console.log('Error', e);
    }
};
// get codes con like
const filterMasterDocumentsForProccess = async (req, res) => {

    const proccess = req.params.proccess;
    try {
        const rta = await sequelize.query(`
        WITH LatestDocuments AS (
            SELECT LEFT(doc_cod, LEN(doc_cod) - 3) AS doc_prefix, MAX(create_date) AS max_date
            FROM [INTRANET_Dev].[dbo].[MASTER_DOCUMENTS]
            WHERE doc_cod LIKE '${proccess}%' AND doc_status <> '1'
            GROUP BY LEFT(doc_cod, LEN(doc_cod) - 3)
        )
        SELECT LEFT(MD.doc_cod, LEN(MD.doc_cod) - 3) AS doc_codTwo, MD.* , CONVERT(varchar, MD.approv_date, 23) as formatted_approv_date
        FROM [INTRANET_Dev].[dbo].[MASTER_DOCUMENTS] MD
        INNER JOIN LatestDocuments LD ON LEFT(MD.doc_cod, LEN(MD.doc_cod) - 3) = LD.doc_prefix AND MD.create_date = LD.max_date
        ORDER BY MD.create_date DESC;`);

        if(rta){
            res.status(201)
            res.json(rta)
        }else{
            res.json({msj: 'No hay resultados'})
        }  

    } catch (e) {
        console.log('Error', e);
    }
};
const getMasterDocumentsFilter = async (req, res) => {

    try {
        const rta = await sequelize.query(`
        WITH LatestDocuments AS (
            SELECT LEFT(doc_cod, LEN(doc_cod) - 3) AS doc_prefix, MAX(create_date) AS max_date
            FROM [INTRANET_Dev].[dbo].[MASTER_DOCUMENTS]
            WHERE doc_status <> '1'
            GROUP BY LEFT(doc_cod, LEN(doc_cod) - 3)
        )
        SELECT LEFT(MD.doc_cod, LEN(MD.doc_cod) - 3) AS doc_codTwo, MD.*, CONVERT(varchar, MD.approv_date, 23) as formatted_approv_date
        FROM [INTRANET_Dev].[dbo].[MASTER_DOCUMENTS] MD
        INNER JOIN LatestDocuments LD ON LEFT(MD.doc_cod, LEN(MD.doc_cod) - 3) = LD.doc_prefix AND MD.create_date = LD.max_date
        ORDER BY MD.create_date DESC;`);

        if(rta){
            res.status(201)
            res.json(rta)
        }else{
            res.json({msj: 'No hay resultados'})
        }  

    } catch (e) {
        console.log('Error', e);
    }
};

// get filter documents
const filterMasterDocuments = async (req, res) => {
    try {
        const id = req.params.id;
        const rta = await sequelize.models.modelMasterDocuments.findOne({
            where: {
                id : id,
            }, 
        });

        if(rta){
            // Setear la fecha ;/ 
            const fecha = new Date(rta.dataValues.approv_date);
            const fechaFormateada = fecha.toISOString().substring(0, 10); // Esto te dará '2024-04-11'
            rta.dataValues.approv_date = fechaFormateada;
            res.status(200)
            res.json(rta)
        }else{
            res.status(404)
            res.json({msj: 'Error en la consulta'})
        } 

    } catch (e) {
        console.log('Error', e);
    }
}
// get filter documents
const filterMasterDocumentsForCode = async (req, res) => {
    try {
        const code = req.params.code;
        const rta = await sequelize.models.modelMasterDocuments.findOne({
            where: {
                doc_cod : code,
            }, 
        });

        if(rta){
            res.status(200)
            res.json(rta)
        }else{
            res.json({msj: 'Error en la consulta'})
        } 

    } catch (e) {
        console.log('Error', e);
    }
}

// post documents
const postMasterDocuments = async (req, res) =>{
    try {
      const newDocuments = {
        doc_cod: req.body.doc_cod,
        doc_title: req.body.doc_title,
        doc_process: req.body.doc_process,
        doc_type: req.body.doc_type,
        doc_version: req.body.doc_version,
        review_date: req.body.review_date,
        approv_date: req.body.approv_date,
        doc_description: req.body.doc_description,
        doc_status: req.body.doc_status,
        doc_file:req.file ? req.file.filename : req.body.doc_fileTwo,
        user_crea: req.body.user_crea
      };


      // Crear documents
      const rta = await sequelize.models.modelMasterDocuments.create(newDocuments); 
      if(rta) {
          // res.status(404)
          res.json({msj: 'Documento creado'})
      }

  } catch (e) {
      console.log('Error', e);
  }
}

// update documents
const updateMasterDocuments = async (req, res) => {


    try {
        const idUser = req.params.id

        const updateDocuments = {
            doc_cod: req.body.doc_cod,
            doc_title: req.body.doc_title,
            doc_process: req.body.doc_process,
            doc_type: req.body.doc_type,
            doc_version: req.body.doc_version,
            review_date: req.body.review_date,
            approv_date: req.body.approv_date,
            doc_description: req.body.doc_description,
            doc_status: req.body.doc_status,
            doc_file:req.file ? req.file.filename : '',
            user_mod: req.body.user_mod,
        };
        
        if(updateDocuments.doc_file === ''){
            delete updateDocuments.doc_file
        }
        
        const rta = await sequelize.models.modelMasterDocuments.update(updateDocuments,{
            where: {id: idUser},
        });
        
        if(rta){
            res.status(200).json(rta);
        }else{
            res.status(404).json({msj: 'Error en la consulta'});
        }
    } catch (e) {
        console.log('Error', e);
    }
}
// update status
const updateEstatus = async (req, res) => {
    try {
        
        const id = req.params.id
        const updateDocuments = {
            doc_status: req.body.status,
        };
    
    
        const rta = await sequelize.models.modelMasterDocuments.update(updateDocuments,{
            where:{id: id},
        });
        
        if(rta){
            res.status(200).json(rta);
        }else{
            res.status(404).json({msj: 'Error en la consulta'});
        }
    } catch (e) {
        console.log('Error', e);
    }
}

// delete documents
const deleteMasterDocuments = async (req, res) => {
    try {
        const id = req.params.id;
        const rta = await sequelize.models.modelMasterDocuments.destroy({where: { id: id }});

        if(rta){
            res.status(200)
            res.json(rta)
        }else{
            res.status(404)
            res.json({msj: 'Error en la consulta'})
        } 

    } catch (e) {
        console.log('Error', e);
    }
};

const getDocument = (req, res) => {
    const documentName = req.params.documentName;
    const documentPath = path.join(__dirname, '../../uploads', documentName);
  
    res.sendFile(documentPath, err => {
      if (err) {
        res.status(500).send({
          message: 'No se pudo descargar el archivo. ' + err,
        });
      }
    });
  };
  
  module.exports = {
    getDocument,
  };

// Export controllers
module.exports = {
    getMasterDocuments,
    filterMasterDocuments,
    postMasterDocuments,
    updateMasterDocuments,
    deleteMasterDocuments,
    getCodeDocuments,
    filterMasterDocumentsForProccess,
    filterMasterDocumentsForCode,
    getDocument,
    updateEstatus,
    getMasterDocumentsFilter
};
 