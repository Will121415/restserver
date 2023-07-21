const { request, response } = require('express');



const getUsers = (req = request, res = response ) => {

    const { q, page, limit } = req.query;

    res.json({ 
        id: 1,
        name: 'will',
        age: 23,
        q,
        page,
        limit
    })
}

const saveUser = (req = request, res = response ) => {

    const { name, age } = req.body;
 
    res.json({ 
        id: 1,
        name,
        age
    })
}

const deleteUser = (req = request, res = response) => {

    const { id } = req.params;

    res.json({
        id,
        msg: 'User deleted'
    })
}

module.exports = { getUsers, saveUser, deleteUser }