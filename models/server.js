//require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        this.usuariosPath = '/api/users';
        this.authPath = '/api/auth';

        //conectar a base de datos
        this.conectarDB();

        //middlewares
        this.middlewares();

        //rutas
        this.routes();

    }

    //Función conectar DB (usar en constructor de la clase)
    async conectarDB() {
        await dbConnection()
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
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usuariosPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Escuchando peticiones en http://localhost:${this.port}`);
        })
    }

}

module.exports = Server;