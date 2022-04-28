const { request, response } = require("express");
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const validarJWT = async( req = request, res = response, next ) => {

    const token = req.header('x-token');

    if ( !token ){
        return res.status(401).json({
            msg: 'No hay token en la petición'
        });
    }

    try {

        const { uid } = jwt.verify( token, process.env.SECRETKEY );

        const authUser = await User.findById( uid );
        if ( !authUser ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario no existe en DB'
            })
        }

        //Verificar estado:
        if ( !authUser.estado ){
            return res.status(401).json({
                msg: 'Token no válido - Usuario eliminado (false)!'
            })
        }
        
        req.authUser = authUser;

        next();

    } catch (error) {
        
        console.log(error);
        res.status(401).json({
            msg: 'Token no valido'
        });
    }

    //console.log(token);
}

module.exports = {
    validarJWT
};