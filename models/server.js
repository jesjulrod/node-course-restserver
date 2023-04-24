const express = require('express')
const cors = require('cors');

const { dbConnection } = require('../database/config')

class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        this.userPath = '/api/usuarios';
        this.authPath = '/api/auth';

        // Conectar a Base de datos
        this.conectarDB();

        // Middlewares
        this.middlewares();

        // Rutas de la aplicación

        this.routes();
    }

    async conectarDB(){
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // lectura y parseo de JSON
        this.app.use(express.json());

        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.userPath, require('../routes/user'));        
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server running at port', this.port);
        });
    }
}

module.exports = Server;