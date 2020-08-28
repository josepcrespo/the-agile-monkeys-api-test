const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;

const validateUserCreate = require('../../hooks/validate-user-create');
const validateUserUpdate = require('../../hooks/validate-user-update');
const checkPermissions = require('feathers-permissions');
const checkUserGetPermissions = require('../../hooks/check-user-get-permissions');

module.exports = {
  before: {
    all: [ authenticate('jwt') ],
    find: [ checkPermissions({ roles: [ 'admin' ] }) ],
    get: [checkUserGetPermissions()],
    create: [
      hashPassword('password'),
      checkPermissions({ roles: [ 'admin' ] }),
      validateUserCreate()
    ],
    update: [
      hashPassword('password'),
      checkPermissions({ roles: [ 'admin' ] }),
      validateUserUpdate()
    ],
    patch: [
      hashPassword('password'),
      checkPermissions({ roles: [ 'admin' ] }),
      validateUserUpdate()
    ],
    remove: [ checkPermissions({ roles: [ 'admin' ] }) ]
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
