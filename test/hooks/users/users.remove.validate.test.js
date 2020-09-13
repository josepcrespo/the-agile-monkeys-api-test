const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const forbiddenHtmlStatusCode = 403;
const notFoundHtmlStatusCode = 404;

describe('users hook: remove.validate', () => {

  it('A `user` with `admin` permissions can delete other `user`', async () => {
    const adminUser = await app.service('users').create({
      email: 'admin' + new Date().getTime() + mailProvider,
      password: 'secret',
      permissions: 'admin'
    });
    const basicUser = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
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
    const deletedUser = await app.service('users').remove(basicUser.id, params);
    try {
      await app.service('users').get(deletedUser.id, params);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, notFoundHtmlStatusCode);
      assert.equal(error.message, 'No record found for id \'' + deletedUser.id + '\'');
    }
  });

  it('A `user` can not delete himself', async () => {
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
    try {
      await app.service('users').remove(adminUser.id, params);
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, forbiddenHtmlStatusCode);
      assert.equal(error.message, 'You are not allowed to delete your own user.');
    }
  });
  
});