const assert = require('assert');
const app = require('../../src/app');

describe('users', () => {
  it('registered the `users` service', () => {
    const service = app.service('users');

    assert.ok(service, 'Registered the service');
  });
});
