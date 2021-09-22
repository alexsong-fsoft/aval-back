'use strict';

const dotenv = require('dotenv');
const path = require('path');
const Server = require('./config/server')

//INICIALIZO LAS VARIABLES DE ENTORNO SEGUN LA VARIABLE NODE_ENV
dotenv.config({
    path: path.resolve(__dirname, process.env.NODE_ENV + '.env')
});

const server = new Server();

server.listen();