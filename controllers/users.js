
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
    
    const id = req.params.id;

    res.json({
        msg: 'put API',
        id
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