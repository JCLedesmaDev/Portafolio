
// Configuracion por defecto del proyecto 
module.exports = {
    connectionBD: 'mongodb://localhost:27017/Portafolio',
    node_env: 'development',

    jwt_secret: 'claveSuperSecreta',
    expire_jwt: '1000*60*5', // 1 min
    
    expire_cookie: '1000*60* 5', // 5 min
    cookie_secret: 'claveSuperSecreta'
}


