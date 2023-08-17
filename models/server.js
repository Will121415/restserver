require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');


class Server { 

    constructor() {
        this.app = express();
        this.port = process.env.PORT;
        
        //Routes
        this.routeAuth = '/api/auth';
        this.routeUsers = '/api/users';

        // Database Connection
        this.dbConnection();

        //Middlewares
        this.middlewares();

        // Routes of my application
        this.routes();

    }

    async dbConnection() {
        await dbConnection();
    }
    
    middlewares() {
        // CORS 
        this.app.use( cors() );

        //  read and parse to json
        this.app.use( express.json() )

        // public directory
        this.app.use( express.static('public'));
    }


    routes() {
        this.app.use( this.routeUsers, require('../routes/users') );
        this.app.use( this.routeAuth, require('../routes/auth') );
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Restserver app listening on port', this.port);
        })
    }
}

module.exports = Server;