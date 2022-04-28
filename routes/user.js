const { Router } = require('express');
const { check } = require('express-validator');

/* const { validarCampos } = require('../middlewares/validar-campos');
const { validarJWT } = require('../middlewares/validar-jwt');
const { adminValidator, multiRoles } = require('../middlewares/validar-roles'); */

const {
    validarCampos,
    validarJWT,
    adminValidator,
    multiRoles
} = require('../middlewares');

const { roleValidator, emailValidator, idValidator } = require('../helpers/db-validators');

const {
    usersGet,
    usersPost,
    usersPut,
    usersDelete,
    usersPatch
} = require('../controllers/users');

const router = new Router();

//get
router.get('/', usersGet);

//post
router.post('/', [
    check('nombre', 'Nombre es obligatorio').not().isEmpty(),
    check('correo').custom( emailValidator ),
    check('pass', 'Contraseña obligatoria debe tener más de 6 caracteres').isLength({ min: 6 }),
    //check('rol', 'Rol inválido').isIn(['ADMIN_ROLE','USER_ROLE']),
    //chech('rol').custom( (rol) => roleValidator(rol) )
    check('rol').custom( roleValidator ),
    validarCampos
] ,usersPost);

//put
router.put('/:id', [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( idValidator ),
    check('rol').custom( roleValidator ),
    validarCampos
] ,usersPut);

//delete
router.delete('/:id', [
    validarJWT,
    //adminValidator,
    multiRoles('ADMIN_ROLE', 'USER_ROLE'),
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom( idValidator ),
    validarCampos
] ,usersDelete);

//patch
router.patch('/', usersPatch);

module.exports = router;