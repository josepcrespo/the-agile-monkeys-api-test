const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const creatingUserWithout = 'Throws a BadRequest when tries to create a `customer` without ';
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const badRequestHtmlStatusCode = 400;

describe('customers hook: create.validate', () => {

  it(creatingUserWithout + '`name` and, `surname`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('customers').create({}, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a `name` and, a `surname`.');
    }
  });

  it(creatingUserWithout + '`name`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('customers').create({ surname: 'Cabrera' }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a `name`.');
    }
  });

  it(creatingUserWithout + '`name`.', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    try {
      await app.service('customers').create({ name: 'Jose' }, { user });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a `surname`.');
    }
  });
  
});