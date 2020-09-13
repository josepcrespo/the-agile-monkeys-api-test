const { authenticate } = require('@feathersjs/authentication').hooks;
const checkPermissions = require('feathers-permissions');

const processCustomerCreate = require('../../hooks/customers/customers.create.process');
const validateCustomerCreate = require('../../hooks/customers/customers.create.validate');
const processCustomerPatch = require('../../hooks/customers/customers.patch.process');
const validateCustomerPatch = require('../../hooks/customers/customers.patch.validate');

module.exports = {
  before: {
    all: [
      authenticate('jwt'),
      checkPermissions({ roles: [ 'admin', 'user' ] })
    ],
    find: [],
    get: [],
    create: [processCustomerCreate(), validateCustomerCreate()],
    update: [processCustomerPatch(), validateCustomerPatch()],
    patch: [processCustomerPatch(), validateCustomerPatch()],
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
