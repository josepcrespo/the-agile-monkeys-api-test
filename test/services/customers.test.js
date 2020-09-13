const assert = require('assert');
const app = require('../../src/app');

describe('customers', () => {

  it('registered the `customers` service', () => {
    const service = app.service('customers');

    assert.ok(service, 'Registered the service');
  });

  it('creates a `customer`', async () => {
    const customerName = 'Jose';
    const customerSurname = 'Cabrera';
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + '@mailprovider.com',
      password: 'secret'
    });
    const customer = await app.service('customers').create(
      { name: customerName, surname: customerSurname },
      { user }
    );

    // Makes sure the customer is created with the data provided
    assert.ok(customer.name, customerName);
    assert.ok(customer.surname, customerSurname);
  });

});
