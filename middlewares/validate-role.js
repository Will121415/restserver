const { response } = require('express');

const isAdminRole = (req, res = response, next) => {

    if (!req.user) {
        res.status(500).json({ msg: 'Está intentando verificar el rol si validar el token antes' });
    }

    if(req.user.role !== 'ADMIN_ROLE') {
        res.status(401).json({ msg: 'No es usuario ADMIN - No puede realizar esta accion' });
    }

    next();
}

module.exports = { isAdminRole }