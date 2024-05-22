const sequelize = require("../config/conexion");
const {encrypt, compare} = require("../helpers/handleBcrypt");
const {tokenSign} = require("../helpers/generateToken");

// SIGNIN
const singIn = async (req, res) =>{
    try {
        
        const { Email, Password } = req.body
        const user = await sequelize.models.modelMasterUser.findOne({
            where: {
                Email : Email,
            }, 
        });
        
        if(!user) {
            res.status(404)
            res.send({error: 'El usuario no existe.'})
        }
    
        // Comparar Password
        const checkPassword = await compare(Password, user.Password);
    
        // JWT
        const tokenSession = await tokenSign(user);
    
        if(checkPassword) {
            res.json({
                Nombre: user.Nombre,
                Email: user.Email,
                Nombre_rol: user.Nombre_rol,
                id: tokenSession,
                token: tokenSession
            })
        }
        
        if(!checkPassword) {
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
            Nombre_rol, 
            Dpto_ventas,
            Linea_ventas,
            User_crea,
            Delete
        } = req.body

        // Verifica si el correo existe
        const email = await sequelize.models.modelMasterUser.findOne({
            where: {
                Email : Email,
            }, 
        });
        if(email) {
           return res.status(404)
        }

        // Encryptar el Password
        const PasswordHash = await encrypt(Password);

        const newUser = {
            Nombre, 
            Email,
            Password: PasswordHash, 
            Id_sucursal, 
            Nombre_rol, 
            Dpto_ventas,
            Linea_ventas,
            User_crea, 
            Delete
        }

        // Crear el usuario
        const rta = await sequelize.models.modelMasterUser.create(newUser); 
        if(rta) {
            // res.status(404)
            res.json({msj: 'Usuario creado'})
        }

    } catch (e) {

        console.log('Error', e);
    }
}

module.exports = {
    singIn,
    signUp
};