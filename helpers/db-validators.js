const Role = require('../models/role');
const User  = require('../models/user');


const isValidRole = async(role = '') => {

    const existRole = await Role.findOne({ role });

    if (!existRole) throw new Error(`El rol ${role} no se encuentra registrado en la DB`);
}

const validateEmailInDB = async(email = '') => {
    
    const  existEmail = await User.findOne({ email });

    if (existEmail) throw new Error('El correro ingresado ya se encuentra registrado');
}

const existUserById = async(id = '') => {
    
    const user = await User.findById(id);

    if (!user) throw new Error(`El usuario con id ${ id } no existe`)
}


module.exports = { isValidRole, validateEmailInDB, existUserById }