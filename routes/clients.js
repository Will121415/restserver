const { Router } = require('express');
const { getClients } = require('../controllers/clients');


const router = Router();

router.get('/', getClients )


module.exports = router;