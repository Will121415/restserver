const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');
const { CodeChallengeMethod } = require('google-auth-library');


const login = async (req = request, res = response) => {

    const { email, password } = req.body;

    try {

        // Verified valid email
        const user = await User.findOne({ email });

        if (!user) { return res.status(400).json({ msg: 'Email y/o password invalidos - [email] ' }) }

        // Verified user status active
        if (!user.status) { return res.status(400).json({ msg: 'El usuario no es encuentra activo' }) }

        // Verified valid password

        const isValidPassword = await bcryptjs.compare(password, user.password);
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

const googleSignIn = async (req, res = response) => {

    const { id_token } = req.body;

    try {
        const { name, email, picture: img } = await googleVerify(id_token);
        console.log({ name, email, img });

        try {

            let user = await User.findOne({ email });


            if (!user) {

                const data = { name, email, password: ':v', img, google: true };
                user = new User(data);
                await user.save();
            }
            if (!user.status) {
                return res.status(401).json({ msg: 'Hable con el ADMIN, usuario bloqueado' });
            }

            const token = await generateJWT(user.uid);

            res.json({
                msg: 'Todo Ok, Google Sign In',
                user,
                token
            })

        } catch (error) {
            res.status(400).json({ mas: `Error al guardar en DB: ${error.message}` })
        }

    } catch (error) {
        res.status(401).json({
            msg: 'Token de google no es valido',
            user: null
        })
    }


}

module.exports = { login, googleSignIn }