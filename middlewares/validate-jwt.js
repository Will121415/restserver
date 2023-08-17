const { response } = require('express');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validateJWT = async(req, res = response, next) => { 

    const token = req.header('x-token');
    
    if (!token) return res.status(401).send({ msg: 'No se envio token en el header' });

    try {
        const { uid } = jwt.verify( token, process.env.PRIVATE_KEY );
        
        // Get Authenticated User
        const user = await User.findById( uid ) 

        // Validate exist user
        if (!user) return res.status(401).send({ msg: 'token invalido - [no existe en DB]' })

        // Validate user status
        if (!user.status) { return res.status(401).json({ msg: 'Token Invalido - [status=false]' }) }
        


        req.user = user;
        next();

    } catch (error) {
        console.log(error);
        return res.status(401).send({ msg: 'Token Invalido!' })
    }

}

module.exports = { validateJWT }
