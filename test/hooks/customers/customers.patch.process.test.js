const assert = require('assert');
const app = require('../../../src/app');

describe('customers hook: patch.process', () => {

  it('creates a `customer` and attaches the ID of the `user` who updated him', async () => {
    const newCustomerName = 'David';
    // Calling a Feathers service from inside the Feathers app
    // can be done without providing authentication on the request.
    const basicUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + '@mailprovider.com',
      password: 'secret'
    });
    let customer = await app.service('customers').create(
      { name: 'Jose', surname: 'Cabrera' },
      { user: basicUser }
    );
    customer = await app.service('customers').patch(
      customer.id, 
      { name: newCustomerName },
      { user: basicUser }
    );

    // Makes sure `updatedById` property value is equal
    // to the ID of user who updated it.
    assert.equal(customer.updatedById, basicUser.id);

    // Makes sure the `updated` property value has been changed as expected
    assert.equal(customer.name, newCustomerName);
  });
  
});