const { request, response } = require('express');
const bcrypt  = require('bcryptjs');

const User = require('../models/user');



const getUsers = async(req = request, res = response ) => {

    const { limit = 5, skip = 0 } = req.query;

    const query = { status: true };

    const [ total, users ] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
        .skip( Number( skip ) )
        .limit( Number( limit ) )
    ]);

    res.json({ total, users });
}

const saveUser = async(req = request, res = response ) => {

    const { name, email, password, role } = req.body;

    const user = new User({ name, email, password, role });
    
    //Encrypt Password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync( password, salt );

    
    await user.save();
 
    res.json({ 
        user
    })
}

const deleteUser = async(req = request, res = response) => {

    const { id } = req.params;
    const userAuthenticated = req.user;

    const user = await User.findByIdAndUpdate( id, { status: false } );
    
    res.json({ user, userAuthenticated });
}

const updateUser = async(req = request, res=  response) => {
    
    const { id } = req.params;
    const { _id, password, google, email, ...user } = req.body;

    if ( password ) {
        //Encrypt Password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync( password, salt );
    }

    const userUpdated = await User.findByIdAndUpdate( id, user );

    res.json({userUpdated});
    
}

module.exports = { getUsers, saveUser, deleteUser, updateUser}