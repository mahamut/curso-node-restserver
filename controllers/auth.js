const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generarJWT');

const login = async (req, res = response) => {

    const { correo, pass } = req.body;

    try{

        //recuperar user por correo
        const user = await User.findOne({ correo });

        //verificar si correo existe
        if (!user) {
            return res.status(400).json({
                msg: 'No existe usuario asociado a este correo'
            });
        }
        // verificar estado
        if ( !user.estado ) {
            return res.status(400).json({
                msg: 'Usuario inválido - eliminado'
            });
        }
        //verificar contra
        const validPass = bcryptjs.compareSync( pass, user.pass );
        if ( !validPass ){
            return res.status(400).json({
                msg: 'Contraseña inválida'
            })
        }
        //generar jwt
        const token = await generarJWT( user.id )

        res.status(200).json({
            msg: "login OK",
            user,
            token
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Hable con el administrador"
        });
    }



}

module.exports = {
    login
}