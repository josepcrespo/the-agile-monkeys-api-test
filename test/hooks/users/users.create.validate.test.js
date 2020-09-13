const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const creatingUserWithout = 'Throws a BadRequest when tries to create a `user` without ';
const mailProvider = '@mailprovider.com';
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const badRequestHtmlStatusCode = 400;

describe('users hook: create.validate', () => {

  it(creatingUserWithout + '`githubId` and, `email`', async () => {
    try {
      await app.service('users').create({
        password: 'secret'
      });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide an `email`.');
    }
  });

  it(creatingUserWithout + '`githubId` and, `password`', async () => {
    try {
      await app.service('users').create({
        email: 'user' + new Date().getTime() + mailProvider,
      });
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide a `password`.');
    }
  });

  it(creatingUserWithout + '`githubId, `email` and, `password`.', async () => {
    try {
      await app.service('users').create({});
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, badRequestHtmlStatusCode);
      assert.equal(error.message, 'Please, provide an `email` and `password`.');
    }
  });
  
});