const sequelize = require("../config/conexion");
const fs = require("fs").promises;
const fs1 = require("fs");
const io = require("../socket.js");
const sharp = require("sharp");
const path = require("path");
const { PDFDocument, rgb } = require("pdf-lib");
const fontkit = require("@pdf-lib/fontkit"); // Importa fontkit
const uploadsDirectory = require("../../uploads/index.js");
const folderWaterMarkDirectory = require("../../imagesWatermark/index.js");

const fontBytes = fs1.readFileSync(
  "C:/Users/d.marcano/Desktop/fuentes/SELENA MARIN.ttf"
);

//CONSULTA DE ORDENES
const getMasterOrder = async (req, res) => {
  try {
    // const rta = await sequelize.models.modelOrders.findAll();
    const rta = await sequelize.query(
      `SELECT  T0.[ID_order]
                ,T0.ID_detalle
                ,T0.Caja_factura
				,T3.Tipo_cedula
                ,T0.Cedula  
                ,T3.Nombre Cliente
                ,T3.Razon_comercial
                ,T1.Sucursal
                ,T0.[User_crea]
                ,T0.[User_asing] Asesor 
                ,T2.Status
                ,T2.ID_status 
                ,T0.User_asing
                ,CAST(T0.Create_date AS DATE) Create_date
        FROM [COMANDA_TEST].[dbo].[ORDERS] T0
        INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.ID_sucursal = T1.ID_sucursal
        INNER JOIN [COMANDA_TEST].[dbo].[MASTER_STATUS] T2 ON T2.ID_status = T0.ID_status
        INNER JOIN [dbo].[MASTER_CLIENTS] T3 ON T0.Cedula = T3.Cedula
        WHERE T0.[Delete] = 0 OR T0.[Delete] IS NULL 
        ORDER BY T0.[ID_order] DESC`
    );

    if (rta) {
      return rta;
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

// New
const getMasterOrderForStore = async (req, res) => {
  try {
    const id_sucursal = req.params.id_sucursal;
    const rta = await sequelize.query(
      `	SELECT T0.[ID_order]
                ,T0.ID_detalle
                ,T0.Caja_factura
				,T3.Tipo_cedula
                ,T0.Cedula
                ,T3.Nombre Cliente
                ,T3.Razon_comercial
                ,T1.Sucursal
                ,T0.[User_crea]
                ,T0.[User_asing] Asesor 
                ,T2.Status
                ,T2.ID_status 
                ,T0.User_asing
                ,CAST(T0.Create_date AS DATE) Create_date
        FROM [COMANDA_TEST].[dbo].[ORDERS] T0
        INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.ID_sucursal = T1.ID_sucursal
        INNER JOIN [COMANDA_TEST].[dbo].[MASTER_STATUS] T2 ON T2.ID_status = T0.ID_status
        INNER JOIN [dbo].[MASTER_CLIENTS] T3 ON T0.Cedula = T3.Cedula
        WHERE T0.[Delete] = 0 OR T0.[Delete] IS NULL AND T0.ID_sucursal = '${id_sucursal}'
        ORDER BY T0.[ID_order] DESC`
    );

    if (rta) {
      res.status(201);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//CONSULTA DE ORDERS DETAILS
const getMasterOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;
    const rta = await sequelize.models.modelOrdersdetails.findAll({
      where: {
        ID_detalle: id,
      },
    });

    if (rta) {
      res.status(201);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//FILTRAR ORDENES POR ID
const filterMasterOrder = async (req, res) => {

    try {
        const id = req.params.id;
        const rta = await sequelize.query(
            `SELECT DISTINCT    
                    T0.[ID_order]
                    ,T0.ID_detalle
                    ,T0.Caja_factura
                    ,T3.Tipo_cedula
                    ,T0.Cedula
                    ,T3.Tipo_cliente
                    ,T3.Email
                    ,T3.Nombre AS Cliente
                    ,T3.Razon_comercial
                    ,T3.Direccion
                    ,T1.ID_sucursal 
                    ,T1.Sucursal 
                    ,T4.ID_states 
                    ,T4.Nombre AS Estado
                    ,T5.ID_city
                    ,T5.Nombre AS Ciudad
                    ,T6.ID_municipio 
                    ,T6.NOMBRE AS Municipio
                    ,STRING_AGG(T7.ID_pago, ',') AS ID_pago
                    ,STRING_AGG(T10.Pago, ' , ') AS Pago
                    ,t0.[User_crea]
                    ,t0.[User_mod]
                    ,t0.[User_asing]
                    ,t0.[ID_rol]
                    ,t0.[ID_status]
                    ,t0.[Tipo_delivery]
                    ,T9.Delivery_type
                    ,t0.[SucursalZoom]
                    ,t0.[Autoriza]
                    ,t0.[Cedula_autoriza]
                    ,t0.Nombre_autoriza
                    ,t0.[Telefono_autoriza]
                    ,T3.Tipo_cedula_rep
                    ,T3.Cedula_rep
                    ,T3.Nombre_rep  
                    ,T3.Email_rep   
                    ,T3.Telefono_rep    
                    ,T3.Direccion_rep   
                    ,T3.Referencia_rep
                    ,T3.ID_state_rep
                    ,T3.ID_city_rep
                    ,T3.ID_municipio_rep
                    ,T3.[Telefono]
                    ,t0.[Retencion]
                    ,T3.Referencia
                    ,t0.[Porc_retencion]
                    ,t0.ID_ticket
                    ,t0.[Delete]
                    ,t0.[Motivo_delete]    
                    ,T2.Status
                    ,CAST(T0.Create_date AS DATE) Create_date
                    ,CAST(T0.[update_date] AS DATE) [Update_date]
            FROM [COMANDA_TEST].[dbo].[ORDERS] T0
            INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.ID_sucursal = T1.ID_sucursal
            INNER JOIN [COMANDA_TEST].[dbo].[MASTER_STATUS] T2 ON T2.ID_status = T0.ID_status
            INNER JOIN [dbo].[MASTER_CLIENTS] T3 ON T0.Cedula = T3.Cedula
            INNER JOIN [dbo].[MASTER_STATES] T4 ON T3.ID_state = T4.ID_states
            INNER JOIN [dbo].[MASTER_CITIES] T5 ON T3.ID_city = T5.ID_city
            INNER JOIN [dbo].[MASTER_MUNICIPALITY] T6 ON T3.ID_municipio = T6.ID_municipio
            INNER JOIN [dbo].[ORDERS_PAYMENT] T7 ON T7.ID_detalle = T0.ID_detalle
            INNER JOIN [dbo].[MASTER_STATUS] T8 ON T0.ID_status = T8.ID_status
            INNER JOIN [dbo].[DELIVERY_TYPE] T9 ON T0.Tipo_delivery = T9.ID_Delivery
            INNER JOIN [dbo].[PAYMENT_METHODS] T10 ON T7.ID_pago = T10.ID_pago
            WHERE T0.ID_detalle = '${id}'
            GROUP BY 
            T0.[ID_order]  ,T0.ID_detalle   ,T0.Caja_factura   ,T3.Tipo_cedula  ,T0.Cedula ,T3.Tipo_cliente  ,T3.Email ,T3.Nombre ,T3.Razon_comercial ,T3.Direccion ,T1.ID_sucursal  ,T1.Sucursal  ,T4.ID_states 
            ,T4.Nombre  ,T5.ID_city  ,T5.Nombre ,T6.ID_municipio ,T6.NOMBRE ,t0.[User_crea]  ,t0.[User_mod]  ,t0.[User_asing] ,t0.[ID_rol]   ,t0.[ID_status]  ,t0.[Tipo_delivery]  ,t0.[SucursalZoom] ,t0.[Autoriza]
            ,t0.[Cedula_autoriza] ,t0.[Telefono_autoriza] ,T3.Tipo_cedula_rep  ,T3.Cedula_rep  ,T3.Nombre_rep    ,T3.Email_rep    ,T3.Telefono_rep    ,T3.Direccion_rep   ,T3.Referencia_rep, T3.ID_state_rep
            ,T3.ID_city_rep  ,T3.ID_municipio_rep ,T3.[Telefono] ,t0.[Retencion] ,T3.Referencia ,t0.[Porc_retencion] ,t0.ID_ticket  ,t0.[Delete]  ,t0.[Motivo_delete]   ,T2.[Status] ,CAST(T0.Create_date AS DATE) 
            ,CAST(T0.[update_date] AS DATE),T9.Delivery_type`
        );
        if (rta) {
            res.status(200);
            res.json(rta);
        } else {
            res.status(404);
            res.json({ msj: "Error en la consulta" });
        }
    } catch (e) {
        console.log("Error", e);

    }
  } catch (e) {
    console.log("Error", e);
  }
};

//CREAR CABECERA ORDENES Y CLIENTES
const createMasterOrderAndDetails = async (req, res) => {
  try {
    const data = req.body;
    // Crear un objeto con los datos del cliente
    const newClients = {
      Nombre: data.nombreCompleto,
      Razon_comercial: data.razonComercial,
      Email: data.email,
      Tipo_cedula: data.tipo_cedula,
      Cedula: data.cedulaUno,
      Direccion: data.direccion,
      Referencia: data.referencia,
      Telefono: data.telefonoUno,
      ID_state: data.estado,
      ID_city: data.ciudad,
      ID_municipio: data.municipio,
      Tipo_cliente: data.tipo,
      Retencion: data.retencion,
      Porc_retencion: data.porcentaje,
      Nombre_rep: data.Nombre_rep,
      Email_rep: data.email_rep,
      Tipo_cedula_rep: data.Tipo_cedula_rep,
      Cedula_rep: data.cedula_rep,
      Direccion_rep: data.direccion_rep,
      Referencia_rep: data.referencia_rep,
      Telefono_rep: data.telefono_rep,
      ID_state_rep: data.estado_rep,
      ID_city_rep: data.ciudad_rep,
      ID_municipio_rep: data.municipio_rep,
    };

    // Crear un objeto con los datos del pedido
        const newOrder = {
            ID_detalle: data.Id_Comanda, // Solo una vez
            ID_sucursal: data.origen,
            Caja_factura: data.Caja_factura,
            Cedula: data.cedulaUno, // También aquí
            User_crea: data.user_crea,
            ID_rol: data.ID_rol,
            ID_status: data.ID_status,
            Tipo_delivery: data.ID_delivery,
            SucursalZoom: data.sucursalZoom,
            Autoriza: data.autorizado,
            Cedula_autoriza: data.cedulaDos,
            Nombre_autoriza: data.Nombre_autoriza,
            Telefono_autoriza: data.telefonoDos,
            Retencion: data.retencion,
            Porc_retencion: data.porcentaje,
            ID_ticket: data.ID_ticket
        };
        

    // const newPay = {
    //     ID_detalle: data.Id_Comanda,
    //     ID_pago: data.ID_pago,
    //     User_crea: data.user_crea,
    // }

    //Comprobar si la cédula ya existe en la base de datos
    let client = await sequelize.models.modelMasterClients.findOne({
      where: { Cedula: data.cedulaUno },
    });
    if (client) {
      // Actualizar el cliente existente
      client = await client.update(newClients);
    } else {
      // Crear un nuevo cliente
      client = await sequelize.models.modelMasterClients.create(newClients);
    }

    // Crear el pedido
    const order = await sequelize.models.modelOrders.create(newOrder);

    //crear pago
    //const payment = await sequelize.models.modelOrdersPay.create(newPay);


    const payments = data.ID_pago; // Asumiendo que los pagos vienen en un array en data.ID_pago

    for (const paymentId of payments) {
      await sequelize.models.modelOrdersPay.create({
        ID_detalle: data.Id_Comanda,
        ID_pago: paymentId,
        User_crea: data.user_crea,
      });
    }

    if (order && client) {
      res.status(201).json({ order, client, payments });
    } else {
      res.status(404).json({ msj: "Error en la creación" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//OBTENER DETALLES DE LOS ARCHIVOS DE LA COMANDA
const filterOrderDetailsFiles = async (req, res) => {
  try {
    const id = req.params.id;

    const rta = await sequelize.query(
      `SELECT *
            FROM [COMANDA_TEST].[dbo].[ORDERS_FILES]
            WHERE [ID_detalle] = '${id}'`
    );
    if (rta) {
      res.status(200);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//OBTENER DETALLES DE COMANDA
const filterOrderDetails = async (req, res) => {
  try {
    const id = req.params.id;

    const rta = await sequelize.query(
      `SELECT *
            FROM [COMANDA_TEST].[dbo].[ORDERS_DETAILS]
            WHERE [ID_detalle] = '${id}'`
    );
    if (rta) {
      res.status(200);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//CREAR DETALLES DE ORDENES
const createOrderDetails = async (req, res) => {

    const data = req.body;

    try {
        const orderDetailData = {
            ID_detalle: data.Id_Comanda,
            ID_producto: data.id_producto,
            Producto: data.producto,
            Unidades: data.unidades,
            Precio: data.precio,
            Subtotal: data.subtotal,
            Direccion: data.direccion,
            Zoom: data.zoom,
        };

        let product = await sequelize.models.modelOrdersdetails.findOne({
            where: { ID_detalle: data.Id_Comanda, ID_producto: data.id_producto },
        });
        if (product) {
            // Actualiza el cliente existente
            product = await product.update(orderDetailData);
        } else {
            // Crea un nuevo cliente
            product = await sequelize.models.modelOrdersdetails.create(
                orderDetailData
            );
        }


    //const orderDetails = await sequelize.models.modelOrdersdetails.create(orderDetailData);

    if (orderDetailData) {
      res.status(201);
      res.json({ product: product });
    } else {
      res.status(404);
      res.json({ msj: "Error en la creación" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

const deleteOrderDetails = async (req, res) => {
  const data = req.body;

  try {
    const { ID_detalle, ID_producto } = data;

    // Busca el registro existente
    const existingProduct = await sequelize.models.modelOrdersdetails.findOne({
      where: { ID_detalle, ID_producto },
    });

    if (existingProduct) {
      // Elimina el registro existente
      await existingProduct.destroy();
      res.status(200).json({ message: "Registro eliminado correctamente" });
    } else {
      res.status(404).json({ message: "Registro no encontrado" });
    }
  } catch (error) {
    console.log("Error al eliminar el registro:", error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

//EDITAR CABECERA ORDENES Y CLIENTES
const updateMasterOrderAndDetails = async (req, res) => {

    try {
        const data = req.body;
        const idOrder = data.Id_Comanda;
        console.log(data);

        const newClients = {
            Nombre: data.nombreCompleto,
            Razon_comercial: data.razonComercial,
            Email: data.email,
            Tipo_cedula: data.tipo_cedula,
            Cedula: data.cedulaUno,
            Direccion: data.direccion,
            Referencia: data.referencia,
            Telefono: data.telefonoUno,
            ID_state: data.estado,
            ID_city: data.ciudad,
            ID_municipio: data.municipio,
            Tipo_cliente: data.tipo,
            Retencion: data.retencion,
            Porc_retencion: data.porcentaje,
            Nombre_rep: data.nombre_rep,
            Email_rep: data.email_rep,
            Tipo_cedula_rep: data.Tipo_cedula_rep,
            Cedula_rep: data.cedula_rep,
            Direccion_rep: data.direccion_rep,
            Referencia_rep: data.referencia_rep,
            Telefono_rep: data.telefono_rep,
            ID_state_rep: data.estado_rep,
            ID_city_rep: data.ciudad_rep,
            ID_municipio_rep: data.municipio_rep,
        };

        const UpdateOrder = {
            ID_detalle: data.Id_Comanda,
            ID_sucursal: data.origen,
            Caja_factura: data.Caja_factura,
            Cedula: data.cedulaUno,
            User_mod: data.user_mod,
            ID_rol: data.ID_rol,
            Tipo_delivery: data.ID_delivery,
            SucursalZoom: data.sucursalZoom,
            Autoriza: data.autorizado,
            Cedula_autoriza: data.cedulaDos,
            Nombre_autoriza: data.Nombre_autoriza,
            Telefono_autoriza: data.telefonoDos,
            Retencion: data.retencion,
            Porc_retencion: data.porcentaje,
            ID_ticket: data.ID_ticket
        };

        // Comprueba si la cédula ya existe en la base de datos
        let client = await sequelize.models.modelMasterClients.findOne({ where: { Cedula: data.cedulaUno } });
        if (client) {
            // Actualiza el cliente existente
            client = await client.update(newClients);
        } else {
            // Crea un nuevo cliente
            client = await sequelize.models.modelMasterClients.create(newClients);
        }

        const order = await sequelize.models.modelOrders.update(UpdateOrder, {
            where: { ID_detalle: idOrder },
        });

        // Eliminar todos los pagos existentes para el id_detalle
        await sequelize.models.modelOrdersPay.destroy({ where: { ID_detalle: idOrder } });

        // Insertar los nuevos pagos
        const payments = data.ID_pago; // Asumiendo que los pagos vienen en un array en data.ID_pago
        for (const paymentId of payments) {
            await sequelize.models.modelOrdersPay.create({
                ID_detalle: data.Id_Comanda,
                ID_pago: paymentId,
                User_crea: data.user_crea,
            });
        }
        if (order && client) {
            res.status(201).json({ order, client, payments });
        } else {
            res.status(400).json({ message: 'Error al actualizar la orden o el cliente' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error interno del servidor' });

    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error interno del servidor" });
  }
};

const addwatermark = async (f, id) => {
  try {
    const width = 400;
    const height = 400;
    const text = `Nro # ${id}`;

    const svgImage = `
          <svg width="${width}" height="${height}">
            <style>
            .title { fill: #001; font-size: 20px; font-weight: bold;}
            </style>
            <text x="38%" y="98%" text-anchor="middle" class="title">${text}</text>
          </svg>
          `;
    const svgBuffer = Buffer.from(svgImage); // creamos la marca de agua en formato svg
    //Buscamos la imagen a la cual vamos agregarle la marca de agua
    const image = await sharp(
      path.join(__dirname, "../../resizeImages", f.filename)
    )
      .composite([
        {
          input: svgBuffer,
          top: 0,
          left: 0,
        },
      ])
      .toFile(path.join(__dirname, "../../imagesWatermark", f.filename)); // ruta donde almacenamos la imagen con marca de agua
  } catch (error) {
    console.log(error);
  }
};

const addWaterMarkPDF = async (f, id) => {
  try {
    // Capturar la ruta de entrada y destino de los archivos PDF.
    let directory = uploadsDirectory();
    let destinationDirectory = folderWaterMarkDirectory();

    // Lee el PDF original.
    const pdfBytes = fs1.readFileSync(`${directory}/${f.filename}`);
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Registra fontkit.
    pdfDoc.registerFontkit(fontkit);

    // Obtiene la primera página.
    const page = pdfDoc.getPages()[0];

    // Obtiene las dimensiones de la pagina.
    const { width, height } = page.getSize();

    // Ajusta las coordenadas del logo en el eje X && Y.
    let coordenadaX = width - width * 0.5;
    let coordenadaY = height - height * 0.95;

    // Prepara el contenido que va a ser agregado.
    let waterInPdf = `DAKA ONLINE: #${id}`;
    let waterInPdfLon = `DAKA ONLINE: #${id}`.length;
    let logitudRectangulo = waterInPdfLon * 10;

    // Crea un rectángulo alrededor de la frase
    page.drawRectangle({
      x: coordenadaX - 10,
      y: coordenadaY / 1.5,
      width: logitudRectangulo,
      height: 30,
      borderWidth: 1,
      borderColor: rgb(0.15, 0.15, 0.15),
      color: rgb(1, 1, 1),
    });

    // Crea una anotación de texto libre
    page.drawText(waterInPdf, {
      x: coordenadaX,
      y: coordenadaY,
      size: 16,
      color: rgb(0.15, 0.15, 0.15),
      font: await pdfDoc.embedFont(fontBytes),
      bold: true,
      italic: true,
    });

    // Guarda el PDF modificado en disco
    const modifiedPdfBytes = await pdfDoc.save();
    console.log("modifiedPdfBytes", modifiedPdfBytes);
    fs1.writeFileSync(
      `${destinationDirectory}/${f.filename}`,
      modifiedPdfBytes
    );
  } catch (error) {
    console.error(error);
  }
};

const resizeImage = async (f) => {
  try {
    const outputPath = path.join(__dirname, "../../resizeImages", f.filename);
    await sharp(f.path) //agarramos la imagen original
      .resize({
        width: 400,
        height: 400,
      })
      .toFile(outputPath); // la almacenamos en la ruta establecida
  } catch (error) {
    console.log(error);
  }
};

const download = async (req, res) => {
  let isRuta = path.join(__dirname, "../../imagesWatermark");

  const nameArchive = req.params.id;

  try {
    const file = `${isRuta}/${nameArchive}`;
    res.download(file); // descarga
  } catch (e) {
    console.log("Error", e);
  }
};

const createOrderDocument = async (req, res) => {
  const data = req.body;
  const files = req.files;
  const Id_Comanda = req.params.id;

  console.log("req.params", req.params);

  try {
    const results = await Promise.all(
      files.map(async (file, index) => {
        try {
          if (file.mimetype.includes("image")) {
            await resizeImage(file); //comprimimos la imagen
            await addwatermark(file, Id_Comanda);
          } else {
            await addWaterMarkPDF(file, Id_Comanda);
          }
        } catch (error) {
          console.log(
            `Ocurrio un error al momento de leer los datos de la imagen ${error}`
          );
        }

        const name = req.files[index].filename;
        const type = req.body[`typeDoc_${index}`];
        const user = req.body[`user_${index}`];

        const ordersFiles = {
          ID_detalle: Id_Comanda,
          Type_File: type,
          File: name,
          User_crea: user,
        };
        return await sequelize.models.modelOrdersFiles.create(ordersFiles);
      })
    );

    // Verificar si todos los documentos se crearon correctamente
    if (results.every((documentOrder) => documentOrder)) {
      res.status(201).json({ documentOrders: results });
    } else {
      res
        .status(404)
        .json({ msj: "Error en la creación de algunos documentos" });
    }
  } catch (e) {
    console.error("Error al guardar los documentos", e.message);
    res.status(500).json({ message: "Error al guardar los documentos" });
  }
};

//BORRAR ARCHVIOS DE LA TABLA ARCHIVOS
const deleteOrderDocument = async (req, res) => {
  //const { id } = req.params;
  const Id = req.params.id;
  const imagen = req.body.imagen;

  try {
    // Encuentra el registro en la base de datos
    const documentOrder = await sequelize.models.modelOrdersFiles.findOne({
      where: { ID_File: Id },
    });

    if (!documentOrder) {
      return res.status(404).json({ message: "Archivo no encontrado" });
    }

    // Elimina el archivo del sistema de archivos
    await fs.unlink(`uploads/${imagen}`);

    // Elimina el registro de la base de datos
    await documentOrder.destroy();

    res
      .status(200)
      .json({ message: "Documento y registro eliminados correctamente" });
  } catch (error) {
    console.error("Error al eliminar el documento y registro", error);
    res
      .status(500)
      .json({ message: "Error al eliminar el documento y registro" });
  }
};

//FILTRO DE ASESOR
const filterMasterAsesor = async (req, res) => {
  try {
    const rta = await sequelize.query(
      `SELECT [ID_user]   
                   ,[Nombre] as [Name]
                   ,[Nombre] + ' - ' + [Linea_ventas] as [Nombre]
            FROM [COMANDA_TEST].[dbo].[MASTER_USER]
            WHERE Nombre_rol = 'Asesor'`
    );
    if (rta) {
      res.status(200);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//UPDATE ASESOR ASIGNADO A COMANDA
const updateMasterAsesor = async (req, res) => {
  try {
    const data = {
      User_asing: req.body.User_asing,
      ID_status: req.body.ID_status,
    };

    const idUser = req.params.id;

    const rta = await sequelize.models.modelOrders.update(data, {
      where: { ID_order: idUser },
    });

    if (rta) {
      res.status(200);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

//UPDATE ASESOR ASIGNADO A COMANDA
const updateStatusOrder = async (req, res) => {
  try {
    const data = {
      ID_status: req.body.status_comanda,
    };

    const idUser = req.params.id;

    const rta = await sequelize.models.modelOrders.update(data, {
      where: { ID_detalle: idUser },
    });

    if (rta) {
      res.status(200);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

// UPDATE DEL DETALLE DE LA ORDER (NO SE ESTA USANDO AHORITA)
const updateMasterOrderDetails = async (req, res) => {

    try {
        const data = {
            ID_detalle: data.Id_Comanda,
            ID_producto: data.id_producto,
            Producto: data.producto,
            Unidades: data.unidades,
            Precio: data.precio,
            Subtotal: data.subtotal,          
            Direccion: data.direccion,
            Zoom: data.zoom,
        };

        const idOrder = req.params.id;
        //   const userUpdate = req.body;
        const rta = await sequelize.models.modelOrdersdetails.update(data, {
            where: { ID_detalle: idOrder },
        });

        if (rta) {
            res.status(200);
            res.json(rta);
        } else {
            res.status(404);
            res.json({ msj: "Error en la consulta" });
        }
    } catch (e) {
        console.log("Error", e);

    }
  } catch (e) {
    console.log("Error", e);
  }
};

// // DELETE ORDER
const deleteMasterOrder = async (req, res) => {
  try {
    const data = {
      // body: req.body,
      Delete: req.body.status,
      Motivo_delete: req.body.motivo,
    };
    // const dataDetalle ={
    //     Delete: '1',
    // }

    const idOrder = req.params.id;
    //const idDetalle = req.body.Id_Comanda;

    // const userUpdate = req.body;
    const rta = await sequelize.models.modelOrders.update(data, {
      where: { ID_order: idOrder },
    });

    if (rta) {
      res.status(200);
      res.json(rta);
    } else {
      res.status(404);
      res.json({ msj: "Error en la consulta" });
    }
  } catch (e) {
    console.log("Error", e);
  }
};

// Export controllers
module.exports = {
  getMasterOrder,
  filterMasterOrder,
  filterMasterAsesor,
  filterOrderDetails,
  createOrderDetails,
  deleteOrderDetails,
  createMasterOrderAndDetails,
  updateMasterOrderAndDetails,
  updateMasterOrderDetails,
  updateMasterAsesor,
  updateStatusOrder,
  deleteMasterOrder,
  getMasterOrderDetails,
  createOrderDocument,
  filterOrderDetailsFiles,
  deleteOrderDocument,
  getMasterOrderForStore,
  download,
};
