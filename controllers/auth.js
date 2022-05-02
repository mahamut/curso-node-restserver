const bcryptjs = require('bcryptjs');
const { request, response } = require('express');

const User = require('../models/user');

const { generarJWT } = require('../helpers/generarJWT');
const { googleVerify } = require('../helpers/google-verify');

const googleSignIn = async( req, res = response ) => {

    const { id_token } = req.body;

    /* res.json({
        msg: 'Todo ok',
        id_token
    }); */

    try {
        //const googleUser = await googleVerify( id_token );
        //console.log( googleUser );

        const { nombre, correo, img } = await googleVerify( id_token );

        let user = await User.findOne({ correo });

        if ( !user ) {
            //Tengo que crearlo
            const data = {
                nombre,
                correo,
                pass: 'default',
                img,
                google: true
            };

            user = new User( data );
            await user.save();

        }

        /* res.json({
            msg: 'Todo bien google sign in',
            id_token
        }); */

        // Si usuario tiene estado = false
        if ( !user.estado ) {
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloqueado'
            });
        }

        // Generar el JWT
        const token = await generarJWT( user.id )

        res.json({
            user,
            token
        });

    } catch (error) {

        console.log(error);

        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar',
            id_token
        });

    }

}

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
    login,
    googleSignIn
}