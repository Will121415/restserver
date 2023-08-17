const { Schema, model } = require('mongoose');

const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio']
    },
    email: {
        type: String,
        required: [true, 'El correo es requerido'],
        unique: true
    },
    password: {
        type: String,
    },
    img: {
        type: String,
    },
    role: {
        type: String,
        required: [true, 'El rol es obligatorio'],
        enum: ['ADMIN_ROLE', 'USER_ROLE', 'SALE_ROLE']
    },
    status: {
        type: Boolean, 
        default: true
    },
    google: {
        type: Boolean,
        default: false
    },

})

UserSchema.methods.toJSON = function() {
    const { __v, password, _id,...users } = this.toObject();
    return { ...users, uid: _id }
}

module.exports = model('User', UserSchema );
