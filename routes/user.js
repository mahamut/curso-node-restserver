const {
    Router
} = require('express');
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
router.post('/', usersPost);

//put
router.put('/', usersPut);

//delete
router.delete('/', usersDelete);

//patch
router.patch('/', usersPatch);

module.exports = router;