//importanciones de node
//importaciones de 3eros
//importaciones módulos

require('dotenv').config();

const Server = require('./models/server');

const server = new Server();

server.listen();