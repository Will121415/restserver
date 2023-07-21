const { Router } = require('express');
const { getUsers, saveUser, deleteUser } = require('../controllers/users');


const router = Router();

router.get('/', getUsers );

router.post('/', saveUser );

router.delete('/:id', deleteUser )


module.exports = router;