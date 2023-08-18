const { Router } = require('express');
const { check } = require('express-validator');

const { login, googleSignIn } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.post('/login',[
    check('email', 'El correo es requerido').notEmpty(),
    validateField
], login );


router.post('/google', [
    check('id_token', 'El token es necesario').notEmpty(),
    validateField
], googleSignIn)

module.exports = router;