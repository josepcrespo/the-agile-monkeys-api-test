// Initializes the `users` service on path `/users`
const { Users } = require('./users.class');
const createModel = require('../../models/users.model');
const hooks = require('./users.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/users', new Users(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('users');

  service.hooks(hooks);

  // Init the `users` database table creating
  // a user with `admin` permissions.
  let user = service.create({
          'email': 'admin@theagilemonkeys.com',
       'password': 'asdf1234',
    'permissions': 'admin'
  });

  // If there is no error creating the user,
  // we can register a log on Node server.
  service.once('created', user =>
    console.info('User with admin permissions created:', user)
  );

  // Adding a user with restricted permissions.
  user = service.create({
          'email': 'user@theagilemonkeys.com',
       'password': 'asdf1234',
    'permissions': 'user'
  });

  // https://github.com/alt3/sequelize-to-json-schemas#usage
  const jsonSchemaManager = app.get('jsonSchemaManager');
  const openApi3Strategy = app.get('openApi3Strategy');
  const serviceSchema = jsonSchemaManager.generate(options.Model, openApi3Strategy);

  // The Swagger definition with the help of `sequelize-to-json-schemas` package.
  service.docs = {
    description: 'Service to manage users.',
    definitions: {
      users: serviceSchema,
      'users_list': serviceSchema
    },
    securities: ['get', 'create', 'update', 'patch', 'remove'],
    operations: {
      find: {
        security: [{
          BearerAuth: []
        }]
      }
    }
  };

  // Expose the Swagger definition.
  app.use('/users', service);
};
