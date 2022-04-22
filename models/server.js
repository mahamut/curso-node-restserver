//require('dotenv').config();
const express = require('express');
const cors = require('cors');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';

        //middlewares
        this.middlewares();

        //rutas
        this.routes();

    }

    middlewares() {

        //CORS: seguridad por origen de peticiones
        this.app.use( cors() );

        //lectura y parseo del body
        this.app.use( express.json() );


        //directorio publico
        this.app.use(express.static('public'));

    }

    routes() {
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando peticiones en http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;