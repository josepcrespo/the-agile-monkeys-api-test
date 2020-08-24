const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const validateUserCreate = require('../../hooks/validate-user-create');
const validateUserUpdate = require('../../hooks/validate-user-update');
const checkPermissions = require('feathers-permissions');
console.log(checkPermissions({ roles: [ 'admin', 'user' ] }));

module.exports = {
  before: {
    all: [
        authenticate('jwt'),
        checkPermissions({ roles: [ 'admin' ] })
    ],
    find: [],
    get: [],
    create: [
      hashPassword('password'),
      validateUserCreate()
    ],
    update: [
      hashPassword('password'),
      validateUserUpdate()
    ],
    patch: [
      hashPassword('password'),
      validateUserUpdate()
    ],
    remove: []
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
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
