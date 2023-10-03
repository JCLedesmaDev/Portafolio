
// Configuracion por defecto del proyecto 
module.exports = {
    connectionBD: 'mongodb://localhost:27017/Portafolio',
    node_env: 'development',

    jwt_secret: 'claveSuperSecreta',
    expire_jwt: 60, // 1 min

    cookie_secret: 'claveSuperSecreta'
}


