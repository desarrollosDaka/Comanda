const bcrypt = require('bcryptjs');


const encrypt = async (contrasenaEnTextoPlano) => {
    const hash = await bcrypt.hash(contrasenaEnTextoPlano, 10);
    return hash
}

const compare = async (passwordPlain, hashPassword) => {
    return await bcrypt.compare(passwordPlain, hashPassword);
}

module.exports = {
    encrypt, compare
}