const mongoose = require('mongoose');
require('dotenv').config();


const dbConnection = async() => {

    try {
        await mongoose.connect(process.env.MONGODN_CONN);
        console.log('Conexion a mongodb establecida');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al realizar conexion con mongodb')
    }
}

module.exports = { dbConnection }