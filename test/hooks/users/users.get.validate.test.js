const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const forbiddenHtmlStatusCode = 403;

describe('users hook: get.validate', () => {

  it('A `user` without `admin` permissions can not get details from another user', async () => {
    const basicUser1 = await app.service('users').create({
      email: 'userOne' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    const basicUser2 = await app.service('users').create({
      email: 'userTwo' + new Date().getTime() + mailProvider,
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
      user: basicUser1
    };
    try {
      await app.service('users').get(basicUser2.id, params);
      assert.fail(expectedBadRequest);
    } catch (error) {
      if (error instanceof AssertionError) {
        throw error;
      }
      assert.equal(error.type, feathersErrorType);
      assert.equal(error.code, forbiddenHtmlStatusCode);
      assert.equal(error.message, 'You do not have the correct permissions.');
    }
  });

});