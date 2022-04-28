const { request, response } = require("express");

const adminValidator = ( req = request, res = response, next ) => {

    if ( !req.authUser ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar jwt'
        });
    }

    const { rol, nombre } = req.authUser;

    if ( rol !== 'ADMIN_ROLE') {
        return res.status(400).json({
            msg: 'Usuario NO es ADMIN - Acceso denegado'
        });
    }

    next();

}

const multiRoles = ( ...roles ) => {

    return (req, res, next) => {

        if ( !req.authUser ) {
            return res.status(500).json({
                msg: 'Se quiere verificar el rol sin validar jwt'
            });
        }

        if ( !roles.includes( req.authUser.rol ) ){
            return res.status(401).json({
                msg: `Rol sin permisos suficientes. Para hacer esto necesita ser: ${ roles }` 
            })
        }

        next();
    }

}

module.exports = {
    adminValidator,
    multiRoles
};