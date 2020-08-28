const path = require('path');
const favicon = require('serve-favicon');
const compress = require('compression');
const helmet = require('helmet');
const cors = require('cors');
const logger = require('./logger');

const feathers = require('@feathersjs/feathers');
const configuration = require('@feathersjs/configuration');
const express = require('@feathersjs/express');

const swagger = require('feathers-swagger');
const sequelizeToJsonSchemas = require('./sequelize-to-json-schemas');

const middleware = require('./middleware');
const services = require('./services');
const appHooks = require('./app.hooks');
const channels = require('./channels');

const authentication = require('./authentication');

const sequelize = require('./sequelize');

const app = express(feathers());

// Load app configuration
app.configure(configuration());
// Enable security, CORS, compression, favicon and body parsing
app.use(helmet());
app.use(cors());
app.use(compress());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(favicon(path.join(app.get('public'), 'favicon.ico')));
// Host the public folder
app.use('/', express.static(app.get('public')));

// Expose the `node_modules` to the public directory
app.use(
  '/third-party-code',
  express.static(path.join(__dirname, '/../node_modules'))
);

// Set up Plugins and providers
app.configure(express.rest());

// Set up for feathers-swagger
// https://github.com/feathersjs-ecosystem/feathers-swagger#example-with-ui
app.configure(swagger({
    openApiVersion: 3,
    docsPath: '/docs',
    uiIndex: path.join(__dirname, '../public/docs/swagger-ui.html'),
  specs: {
    //docsPath: '/docs',
    //uiIndex: path.join(__dirname, '../public/docs/swagger-ui.html'),
    info: {
      title: 'API Test - CRM service docs',
      description: 'An API test built with Node.js, FeathersJS and more,' +
                   ' for The Agile Monkeys team.',
      version: '1.0.0'
    },
    components: {
      securitySchemes: {
        BearerAuth: {
          type: 'http',
          scheme: 'bearer'
        }
      }
    },
    security: [{
      BearerAuth: []
    }]
  }
}));

app.configure(sequelize);
app.configure(sequelizeToJsonSchemas);


// Configure other middleware (see `middleware/index.js`)
app.configure(middleware);
app.configure(authentication);
// Set up our services (see `services/index.js`)
app.configure(services);
// Set up event channels (see channels.js)
app.configure(channels);

// Configure a middleware for 404s and the error handler
app.use(express.notFound());
app.use(express.errorHandler({ logger }));

app.hooks(appHooks);

module.exports = app;
