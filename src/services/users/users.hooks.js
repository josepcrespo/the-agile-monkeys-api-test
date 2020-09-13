const { authenticate } = require('@feathersjs/authentication').hooks;
const { hashPassword, protect } = require('@feathersjs/authentication-local').hooks;

const checkFeathersPermissions = require('feathers-permissions');
const validateUserCreate = require('../../hooks/users/create-validations');
const validateUserGet = require('../../hooks/users/get-validations');
const validateUserPatch = require('../../hooks/users/patch-validations');
const validateUserRemove = require('../../hooks/users/remove-validations');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ checkFeathersPermissions({ roles: [ 'admin' ] }) ],
    get: [ validateUserGet() ],
    create: [
      checkFeathersPermissions({ roles: [ 'admin' ] }),
      validateUserCreate(),
      hashPassword('password')
    ],
    update: [
      checkFeathersPermissions({ roles: [ 'admin' ] }),
      hashPassword('password'),
    ],
    patch: [
      checkFeathersPermissions({ roles: [ 'admin' ] }),
      validateUserPatch(),
      hashPassword('password')
    ],
    remove: [
      checkFeathersPermissions({ roles: ['admin'] }),
      validateUserRemove()
    ]
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
