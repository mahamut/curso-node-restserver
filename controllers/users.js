
const usersGet = (req, res) => {
    res.json({
        msg: 'get API'
    });
}

const usersPost = (req, res) => {

    //body = req.body;
    //desestructurar del body lo que necesitas

    const { nombre, edad } = req.body

    res.json({
        msg: 'post API',
        nombre,
        edad
    });
}

const usersPut = (req, res) => {
    res.json({
        msg: 'put API'
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