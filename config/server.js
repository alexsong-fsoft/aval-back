const express = require('express');
const http = require('http');
const fileUpload = require('express-fileupload');
//const { dbConnection } = require('../config/database');
const cors = require('cors');
const bodyParser = require('body-parser');

class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;
        this.server = http.createServer(this.app);
        //this.io = require('socket.io')(server);

        // Conectar a base de datos
        //this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de mi aplicación
        this.routes();
    }

    // async conectarDB() {
    //     await dbConnection();
    // }


    middlewares() {
        // CORS
        // this.app.use( cors() );
        //this.app.use(this.allowCrossDomain);
        this.app.use(cors({
            origin: '*'
        }));

        // Lectura y parseo del body
        // this.app.use( express.json() );

        this.app.use(bodyParser.json()); // support json encoded bodies
        this.app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

        // Directorio Público
        // this.app.use( express.static('public') );

        // Fileupload - Carga de archivos
        this.app.use( fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }


    allowCrossDomain (req, res, next) {
        res.header('Content-Type: application/json');
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Headers', 'Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Access-Control-Allow-Request-Method');
        res.header('Access-Control-Allow-Methods', 'GET, PUT, POST, DELETE, OPTIONS');
        res.header('Allow', 'GET, PUT, POST, DELETE, OPTIONS');
        next();
    }


    routes() {
        this.app.use( '/aval-api', require('../routes/comentarios'));
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
