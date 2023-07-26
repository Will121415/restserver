const { Router } = require('express');
const { check } = require('express-validator');

const { getUsers, saveUser, deleteUser, updateUser } = require('../controllers/users');
const { validateField } = require('../middlewares/validate-field');
const { isValidRole, validateEmailInDB, existUserById } = require('../helpers/db-validators');


const router = Router();


router.post('/',[
    check('name', 'El nombre es obligatorio').notEmpty(),
    check('password', 'La contrasena debe tener mas de 6 caracteres').isLength({ min: 6 }),
    check('email', 'El correo ingresado no es valido').isEmail(),
    check('email').custom( validateEmailInDB ),
    // check('role', 'El rol ingresado no es un rol valido').isIn(['USER_ROLE', 'ADMIN_ROLE']),
    check('role').custom( isValidRole ),
    validateField
], saveUser );

router.get('/', getUsers );

router.delete('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserById ),
    validateField
], deleteUser );

router.put('/:id',[
    check('id', 'No es un ID valido').isMongoId(),
    check('id').custom( existUserById ),
    check('role').custom( isValidRole ),
    validateField
], updateUser );


module.exports = router;