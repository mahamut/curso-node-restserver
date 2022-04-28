const {
    request,
    response
} = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = async (req = request, res = response) => {

    //const queryparams = req.query;
    //const { q, nombre, apikey } = req.query; 
    // const { id, nombre = 'no name' } = req.query;
    const {
        limite = 5, desde = 0
    } = req.query

    const queryFilter = {
        estado: true
    }

    //const usersList = await User.find()
    //    .skip(desde)
    //    .limit(limite);

    //sin usar desestructuración de arreglo
    //const userListResponse = await Promise.all([])

    //usando desestructuración de arreglo
    const [ usersAll, usersFiltered ] = await Promise.all([
        User.countDocuments(queryFilter),
        User.find()
            .skip(desde)
            .limit(limite)
    ]);

    res.json({
        //msg: 'get API',
        //queryparams
        //usersList
        //userListResponse
        usersAll,
        usersFiltered
    });

}

const usersPost = async (req, res) => {
    //body = req.body;
    //desestructurar del body lo que necesitas

    const {
        nombre,
        correo,
        pass,
        rol
    } = req.body;
    const usuario = new User({
        nombre,
        correo,
        pass,
        rol
    });

    //Encriptar contraseña
    const salt = bcryptjs.genSaltSync();
    usuario.pass = bcryptjs.hashSync(pass, salt);

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

    const {
        id
    } = req.params;

    const {
        _id,
        pass,
        google,
        ...rest
    } = req.body;

    if (pass) {
        const salt = bcryptjs.genSaltSync();
        rest.pass = bcryptjs.hashSync(pass, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, rest, {
        new: true
    });

    res.json({
        id,
        msg: 'put API',
        updatedUser
    });
}

const usersDelete = async(req, res) => {

    const { id } = req.params;

    //esto boraría físicamente el registro del usuario en la colección
    //no se recomienda para poder hacer seguimiento a lo que puede o no haber hecho ese usuario
    //const deletedUser = await User.findByIdAndDelete(id);

    const { estado } = req.body;

    const removedUser = await User.findByIdAndUpdate(id, {estado : false}, {new: true});

    res.json({
        msg: 'delete API',
        //deletedUser
        removedUser
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