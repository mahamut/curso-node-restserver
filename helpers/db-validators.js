const User = require('../models/user');
const Role = require('../models/role');

const roleValidator = async (rol = '') => {
    const existeRol = await Role.findOne({
        rol
    });
    if (!existeRol) {
        throw new Error(`El rol ${ rol } no está registrado en BD y, por lo tanto, no es válido`);
    }
}

   //Verificar correo existe
const emailValidator = async (correo = '') => {
    const existeEmail = await User.findOne({
        correo
    });
    if ( existeEmail ) {
        throw new Error(`El correo ${ correo } ya está registrado. Prueba con otro email, por favor`);
        //return res.status(400).json({
        //    msg: 'Ese correo ya está registrado'
        //});
    }
}

const idValidator = async ( id ) => {
    const existeId = await User.findById(id);
    if ( !existeId ) {
        throw new Error(`El id ${ id } no se encuentra registrado. Primero crea un usuario, por favor`);
        //return res.status(400).json({
        //    msg: 'Ese correo ya está registrado'
        //});
    }
}

module.exports = {
    roleValidator,
    emailValidator,
    idValidator
};