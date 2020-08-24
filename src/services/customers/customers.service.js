// Initializes the `customers` service on path `/customers`
const { Customers } = require('./customers.class');
const createModel = require('../../models/customers.model');
const hooks = require('./customers.hooks');

module.exports = function (app) {
  const options = {
    Model: createModel(app),
    paginate: app.get('paginate')
  };

  // Initialize our service with any options it requires
  app.use('/customers', new Customers(options, app));

  // Get our initialized service so that we can register hooks
  const service = app.service('customers');

  service.hooks(hooks);
};
