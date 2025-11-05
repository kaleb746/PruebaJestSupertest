const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Usuarios',
      version: '1.0.0',
      description: 'Documentación de la API de Usuarios con Express y Sequelize',
    },
    servers: [
      {
        url: 'http://localhost:8085', // mismo puerto que usas en Server
      },
    ],
  },
  // Rutas donde Swagger buscará las anotaciones JSDoc
  apis: ['./routes/*.js'], // puedes agregar más archivos si lo necesitas
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
