const assert = require('assert');
const app = require('../../src/app');
//const { BadRequest } = require('@feathersjs/errors');
const mailProvider = '@mailprovider.com';

describe('users', () => {
  it('registered the `users` service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user (from inside the app) and, encrypts his password', async () => {
    // Calling a Feathers service from inside the Feathers app
    // can be done without providing authentication on the request.
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });

    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
  });

  it('removes password for external requests', async () => {
    const adminUser = await app.service('users').create({
      email: 'admin' + new Date().getTime() + mailProvider,
      password: 'secret',
      permissions: 'admin'
    });
    const params = {
      // Setting `provider` indicates an external request
      provider: 'rest',
      /**
       * The official Feathers Guide says:
       *  "We 'fake' authentication by setting params.user manually."
       *  https://docs.feathersjs.com/guides/basics/testing.html#testing-services
       *
       * But that's not enough, whe should set the `authenticated` property
       * to `true` and, also add a user with the required permissions for
       * the request we want to send.
       */
      authenticated: true,
      user: adminUser
    };
    const restUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    }, params);
    // Make sure password has been removed
    assert.ok(!restUser.password);
  });

  it('creates a user with default permissions', async () => {
    const basicUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });

    assert.equal(basicUser.permissions, 'user');
  });
});
