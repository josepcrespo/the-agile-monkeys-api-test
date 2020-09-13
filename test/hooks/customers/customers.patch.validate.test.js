const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const notAllowedEmptyProperties = ['name', 'surname'];
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const badRequestHtmlStatusCode = 400;

describe('customers hook: patch.validate', () => {

  it('A `user` can PATCH other `user`', async () => {
    const newCustomerName = 'David';
    const user = await app.service('users').create({
      email: 'userOne' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    let customer = await app.service('customers').create(
      { name: 'Jose', surname: 'Cabrera'},
      { user }
    );
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
      user
    };
    customer = await app.service('customers').patch(customer.id, {
      name: newCustomerName
    }, params);
    // Checking if the property has been set properly
    assert.equal(customer.name, newCustomerName);
  });

  notAllowedEmptyProperties.forEach(property => {
    it(
      'Throws a BadRequest when tries to update a `customer` with an empty ' +
      '`' + property +'`',
      async () => {
        const user = await app.service('users').create({
          email: 'user' + new Date().getTime() + mailProvider,
          password: 'secret'
        });
        let customer = await app.service('customers').create(
          { name: 'Jose', surname: 'Cabrera'},
          { user }
        );
        try {
          const patchObj = new Object;
          patchObj[property.toString()] = '';
          await app.service('customers').patch(customer.id, patchObj, { user });
          assert.fail(expectedBadRequest);
        } catch (error) {
          if (error instanceof AssertionError) {
            throw error;
          }
          assert.equal(error.type, feathersErrorType);
          assert.equal(error.code, badRequestHtmlStatusCode);
          assert.equal(error.message, 'Please, provide valid `' + property + '`.');
        }
      }
    );
  });
  
});