const { validationResult } = require('express-validator');

const validarCampos = ( req, res, next ) => {
    
    const checkErrors = validationResult(req);
    if ( !checkErrors.isEmpty() ) {
        return res.status(400).json(checkErrors);
    }

    next();
}

module.exports = {
    validarCampos
};
