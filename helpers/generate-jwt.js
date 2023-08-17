const jwt = require('jsonwebtoken');

const generateJWT = (uid = '') => {
    
    const payload = { uid }

    return new Promise((resolve, reject) => {
        jwt.sign( payload, process.env.PRIVATE_KEY, { expiresIn: '4d' }, (err, token) => {

            if(err) {
                console.log(err);
                reject('Error al generar el token');
            } else {
                resolve( token );
            }
        })
    })
}

module.exports = { generateJWT }

