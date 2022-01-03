const jwt = require('jsonwebtoken');

const generarJWT = ( uid = '') => {

    return new Promise((resolve, reject)=>{

        // console.log('al llegar ', uid)
        const payload = { uid };

        // console.log('payload', payload)

        jwt.sign(payload, process.env.SECRET_PKEY, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('no se pudo generar el token')
            } else {
                resolve(token);
            }
        })
    });
}


module.exports = {generarJWT}