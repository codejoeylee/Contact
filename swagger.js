// swagger.js
const swaggerAutogen = require('swagger-autogen')();
const outputFile = './swagger-output.json';
const endpointsFiles = ['./routes/index.js']; 
const doc = {
  info: {
    title: 'Contact API',
    description: 'API for managing contacts',
  },
  host: process.env.RENDER_EXTERNAL_HOSTNAME || 'localhost:5050',
  basePath: '/',
  schemes: [process.env.RENDER_EXTERNAL_HOSTNAME ? 'https':'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
};

swaggerAutogen(outputFile, endpointsFiles, doc);
