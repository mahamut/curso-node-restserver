const { Router } = require('express');
const { check } = require('express-validator');

const { emailValidator } = require('../helpers/db-validators');
const { validarCampos } = require('../middlewares/validar-campos');

const { login } = require('../controllers/auth');

const router = Router();

router.post('/login', [
    check('correo', 'El Correo es obligatorio').isEmail(),
    check('pass', 'La Contraseña obligatoria').not().isEmpty(),
    validarCampos
],login );


module.exports = router;