const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

const processCustomerCreate = require('../../hooks/process-customer-create');
const processCustomerUpdate = require('../../hooks/process-customer-update');
const validateCustomerCreate = require('../../hooks/validate-customer-create');
const validateCustomerUpdate = require('../../hooks/validate-customer-update');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({ roles: [ 'admin', 'user' ] })
    ],
    find: [],
    get: [],
    create: [processCustomerCreate(), validateCustomerCreate()],
    update: [processCustomerUpdate(), validateCustomerUpdate()],
    patch: [processCustomerUpdate(), validateCustomerUpdate()],
    remove: []
  },

  after: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
