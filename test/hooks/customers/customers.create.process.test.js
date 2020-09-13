const assert = require('assert');
const app = require('../../../src/app');

describe('customers hook: create.process', () => {

  it('creates a `customer` and attaches the ID of the `user` who created him', async () => {
    // Calling a Feathers service from inside the Feathers app
    // can be done without providing authentication on the request.
    const basicUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + '@mailprovider.com',
      password: 'secret'
    });

    const customer = await app.service('customers').create(
      { name: 'Jose', surname: 'Cabrera' },
      { user: basicUser }
    );

    // Makes sure `createdById` property value is equal
    // to the ID of user who created it.
    assert.equal(customer.createdById, basicUser.id);
  });
  
});