const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { connect } = require('../db/config');

class Server {

    constructor() {

        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            auth:       '/api/auth/',
            buscar:     '/api/buscar',
            categorias: '/api/categorias',
            productos:  '/api/productos',
            users:      '/api/users/',
            uploads:    '/api/uploads'  
        } 

        //Conectar a DB
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async dbConnection() {

        await connect();
        
    }

    middlewares () {

        // cors
        this.app.use(cors());

        
        this.app.use(express.json());
        // directorio publico
        
        this.app.use(express.static('public'));

        // Carga de archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath: true
        }));
    }

    routes () {

        this.app.use(this.paths.auth, require('../routes/auth'));
        this.app.use(this.paths.buscar, require('../routes/buscar'));
        this.app.use(this.paths.categorias, require('../routes/categorias'));
        this.app.use(this.paths.productos, require('../routes/productos'));
        this.app.use(this.paths.users, require('../routes/users'));
        this.app.use(this.paths.uploads, require('../routes/uploads'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('server escuchando en puerto', this.port)
        });
    }
}

module.exports = Server