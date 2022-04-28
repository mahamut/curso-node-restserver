const { Schema, model } = require('mongoose');

const userSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'El Nombre es obligatorio'],
    },
    correo: {
        type: String,
        required: [true, 'El Correo es obligatorio'],
        unique: true
    },
    pass: {
        type: String,
        required: [true, 'La Contraseña es obligatorio'],
    },
    img: {
        type: String,
    },
    rol: {
        type: String,
        required: true,
        emun: ['ADMIN_ROLE', 'USER_ROLE']
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false

    }
});

/* {
    nombre: String,
    correo: String,
    pass: String,
    img: String(URL),
    rol: String,
    estado: false,
    google: false
} */

userSchema.methods.toJSON = function() {
    const { __v, pass, ...user } = this.toObject();
    return user;
}

module.exports = model( 'User', userSchema );