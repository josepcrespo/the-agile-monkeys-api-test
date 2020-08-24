const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const validateUserCreate = require('../../hooks/validate-user-create');

const validateUserUpdate = require('../../hooks/validate-user-update');

module.exports = {
  before: {
    all: [ checkPermissions({ roles: ['admin'] }) ],
    find: [ authenticate('jwt') ],
    get: [ authenticate('jwt') ],
    create: [
      hashPassword('password'),
      validateUserCreate()
    ],
    update: [
      hashPassword('password'),
      authenticate('jwt'),
      validateUserUpdate()
    ],
    patch: [
      hashPassword('password'),
      authenticate('jwt'),
      validateUserUpdate()
    ],
    remove: [ authenticate('jwt') ]
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
