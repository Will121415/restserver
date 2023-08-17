const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');


const login = async(req = request, res = response) => {
    
    const { email, password } = req.body;

    try {
        
        // Verified valid email
        const user = await User.findOne({ email });
        
        if (!user) { return res.status(400).json({ msg: 'Email y/o password invalidos - [email] ' }) }
    
        // Verified user status active
        if (!user.status) { return res.status(400).json({ msg: 'El usuario no es encuentra activo' }) }
    
        // Verified valid password
    
        const isValidPassword = await bcryptjs.compare( password, user.password );
        if (!isValidPassword) { return res.status(400).json({ msg: 'Email y/o password invalidos - [password]' }) }

        // Generate Token
        const token = await generateJWT(user._id);
        
        res.json({
            msg: 'Login ok',
            user,
            token
        })

        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Contactese con el admin 😁'
        })
        
    }


}

module.exports = { login }