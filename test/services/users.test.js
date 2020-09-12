const assert = require('assert');
const app = require('../../src/app');

describe('users', () => {
  it('registered the `users` service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });

  it('creates a user (from inside the app) and, encrypts his password', async () => {
    // Calling a Feathers service from inside the Feathers app
    // can be done without providing authentication on the request.
    const user = await app.service('users').create({
      //email: 'test' + Math.floor(Math.random() * 1000) + '@example.com',
      email: 'test' + Math.floor(Math.random() * 1000) + '@example.com',
      password: 'secret'
    });

    // Makes sure the password got encrypted
    assert.ok(user.password !== 'secret');
  });

  it('removes password for external requests', async () => {
    // Setting `provider` indicates an external request
    const params = {
      provider: 'rest',
      /* The method provided by the official docs does not work:
       *
       * https://docs.feathersjs.com/guides/basics/testing.html#testing-services
       *
       * but we can fake we are authenticated,
       * setting the `authenticated` property to `true`.
       *
       * You can check it on the `authenticate.js` module file:
       * https://docs.feathersjs.com/guides/basics/testing.html#testing-services
       */
      authenticated: true
    };

    const user = await app.service('users').create({
      email: 'test' + Math.floor(Math.random() * 1000) + '@example.com',
      password: 'secret'
    }, params);

    // Make sure password has been removed
    assert.ok(!user.password);
  });
});
