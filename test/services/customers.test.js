const assert = require('assert');
const app = require('../../src/app');

describe('customers', () => {
  it('registered the `customers` service', () => {
    const service = app.service('customers');

    assert.ok(service, 'Registered the service');
  });
});
