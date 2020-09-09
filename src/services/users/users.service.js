// Initializes the `users` service on path `/users`
const { Users }   = require('./users.class');
const createModel = require('../../models/users.model');
const hooks       = require('./users.hooks');

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

  /**
   * Init the `users` database table with two users:
   * first one with `admin` permissions and, the
   * second with `user` permissions.
   */
  const initialUsers = [{
    'email': 'admin@theagilemonkeys.com',
    'password': 'asdf1234',
    'permissions': 'admin'
  }, {
    'email': 'user@theagilemonkeys.com',
    'password': 'asdf1234',
    'permissions': 'user'
  }];

  initialUsers.forEach(user => {
    if ( !service.find({ query: { email: user.email } }) ) {
      service.create(user);
    }
  });

  // https://github.com/alt3/sequelize-to-json-schemas#usage
  const jsonSchemaManager = app.get('jsonSchemaManager');
  const openApi3Strategy = app.get('openApi3Strategy');
  const serviceSchema = jsonSchemaManager.generate(options.Model, openApi3Strategy);

  // Adding example values for Swagger UI.
  serviceSchema.properties.email.example       = 'hello@emailprovider.com';
  serviceSchema.properties.password.example    = '1qazxsw23edcvfr4';
  serviceSchema.properties.githubId.example    = '3214895';
  serviceSchema.properties.permissions.example = 'admin';

  // Adding the possible values for the permissions property.
  serviceSchema.properties.permissions.enum = ['admin', 'user'];

  // Adding a description for the githubId property.
  serviceSchema.properties.githubId.description =
    'This property is set automatically when using the GitHub OAuth strategy. ' +
    'Normally you should use the "local" strategy, with an email and a password.';

  // The Swagger definition with the help of `sequelize-to-json-schemas` package.
  service.docs = {
    description: 'Service to manage users.',
    definitions: {
      users: serviceSchema,
      'users_list': {
        type: 'array',
        items: serviceSchema
      }
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
