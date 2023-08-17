const { Router } = require('express');
const { check } = require('express-validator');

const { login } = require('../controllers/auth');
const { validateField } = require('../middlewares/validate-field');

const router = Router();

router.post('/login',[
    check('email', 'El correo es requerido').notEmpty(),
    validateField
], login );

module.exports = router;