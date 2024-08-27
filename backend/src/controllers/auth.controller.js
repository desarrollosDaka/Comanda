const sequelize = require("../config/conexion");
const { encrypt, compare } = require("../helpers/handleBcrypt");
const { tokenSign } = require("../helpers/generateToken");

// SIGNIN
const singIn = async (req, res) => {
    try {

        const { Email, Password } = req.body
         // await sequelize.models.modelMasterUser.findOne({
        //     where: {
        //         Email: Email,
        //         Delete: 0,
        //     },
        // });
       const user = await sequelize.query(
            `SELECT T0.[ID_user]
              ,T0.[Nombre]
              ,T0.[Email]
              ,T0.[Password]
              ,T0.[Id_sucursal]
              ,T1.Sucursal
			  ,T0.ID_rol
			  ,T2.Nombre_rol
              ,T0.[Dpto_ventas]
              ,T0.[Linea_ventas]
              ,T0.[User_crea]
              ,T0.[User_mod]
              ,T0.[Delete]
              ,T0.[Create_date]
              ,T0.[Update_date]
          FROM [COMANDA_TEST].[dbo].[MASTER_USER] T0
          INNER JOIN [dbo].[MASTER_STORES] T1 ON T0.Id_sucursal = T1.ID_sucursal
		  INNER JOIN [dbo].[MASTER_ROLS] T2 ON T0.ID_rol = T2.ID_rol
          WHERE [Delete] = 0 AND T0.[Email] = '${Email}'`);


        if (!user[0][0]) {
            res.status(404)
            res.send({ error: 'El usuario no existe.' })
        }
        //console.log(user);
        // Comparar Password
    

        const checkPassword = await compare(Password, user[0][0].Password);

        // JWT
        const tokenSession = await tokenSign(user[0][0]);

        if (checkPassword) {
            res.json({
                ID_user: user[0][0].ID_user,
                Nombre: user[0][0].Nombre,
                Email: user[0][0].Email,
                ID_rol: user[0][0].ID_rol,
                Nombre_rol: user[0][0].Nombre_rol,
                Id_sucursal: user[0][0].Id_sucursal,
                Delete: 0,
                id: tokenSession,
                token: tokenSession
            })
        }

        if (!checkPassword) {
            res.status(409)
            res.send({
                error: 'Contraseña incorrecta.'
            })
        }

    } catch (e) {

        console.log('error', e)
    }
}

// SIGNUP
const signUp = async (req, res) => {
    try {

        const {
            Nombre,
            Email,
            Password,
            Id_sucursal, 
            ID_rol,
            Dpto_ventas,
            Linea_ventas,
            User_crea,
            Delete
        } = req.body

        // Verifica si el correo existe
        const email = await sequelize.models.modelMasterUser.findOne({
            where: {
                Email: Email,
                Delete: 0
            },
        });
        if (email) {
            return res.status(404)
        }

        // Encryptar el Password
        const PasswordHash = await encrypt(Password);

        const newUser = {
            Nombre,
            Email,
            Password: PasswordHash,
            Id_sucursal,
            ID_rol,
            Dpto_ventas,
            Linea_ventas,
            User_crea,
            Delete
        }

        // Crear el usuario
        const rta = await sequelize.models.modelMasterUser.create(newUser);
        if (rta) {
            // res.status(404)
            res.json({ msj: 'Usuario creado' })
        }

    } catch (error) {

        if (error.response && error.response.status === 409) {
            console.error('Error de conflicto:', error.response.data.message);
          } else {
            console.error('Error en el login:', error.message);
          }
    }
}

module.exports = {
    singIn,
    signUp
};