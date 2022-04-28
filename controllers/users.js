const { request, response } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req, res) => {
    
    //const queryparams = req.query;
    const { q, nombre, apikey } = req.query; 
    // const { id, nombre = 'no name' } = req.query;
    
    res.json({
        msg: 'get API',
        //queryparams
        q,
        nombre,
        apikey
    });
}

const usersPost = async (req, res) => {
    //body = req.body;
    //desestructurar del body lo que necesitas

    const { nombre, correo, pass, rol } = req.body;
    const usuario = new User( {nombre, correo, pass, rol} );

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync( pass, salt );

    //Guardar en DB
    await usuario.save();

    //res.json({
    //    msg: 'post API',
    //    nombre,
    //    edad
    //});

    res.json({
        msg: 'post API - User',
        usuario
    });
}

const usersPut = async (req, res) => {
    
    const { id } = req.params;

    const { _id, pass, google, ...rest } = req.body;

    if ( pass ){
        const salt = bcryptjs.genSaltSync();
        rest.pass = bcryptjs.hashSync( pass, salt );
    }
 
    const updatedUser = await User.findByIdAndUpdate( id, rest, {
        new: true
    });

    res.json({
        id,
        msg: 'put API',
        updatedUser
    });
}

const usersDelete = (req, res) => {
    res.json({
        msg: 'delete API'
    });
}

const usersPatch = (req, res) => {
    res.json({
        msg: 'patch API'
    });
}
module.exports = {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
}