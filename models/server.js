const express = require('express');
const cors = require('cors');
require('dotenv').config();

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../swagger');

class Server {
    constructor() {
        this.app = express();
        this.port = process.env.PORT || 8085;
        this.middlewares();
        this.routes();
    }

    middlewares() {
        this.app.use(cors());
        this.app.use(express.json());
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

        this.app.use('/api/usuarios', require('../routes/usuarios'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Server listening on port ${this.port}`);
        });
    }
}

module.exports = Server;
