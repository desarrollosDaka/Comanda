const {verifyToken} = require("../helpers/generateToken");


const checkAuth = async (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ').pop();
        const tokenData = await verifyToken(token);
        if(tokenData.ID_user){
            next();
        }else{
            res.status(409);
            res.json({ error: 'Tu por aqui no pasas'});
        }
    } catch (e) {
        console.log('error')
        res.status(409);
        res.json({ error: 'Tu por aqui no pasas'});
    }
}

module.exports = {
    checkAuth
}