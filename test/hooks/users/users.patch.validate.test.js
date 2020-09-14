const assert = require('assert');
const { AssertionError } = require('assert');
const app = require('../../../src/app');

const mailProvider = '@mailprovider.com';
const notAllowedEmptyProperties = ['email', 'password', 'githubId', 'permissions'];
const expectedBadRequest = 'Expected Feathers BadRequest not thrown.';
const feathersErrorType = 'FeathersError';
const badRequestHtmlStatusCode = 400;
const forbiddenHtmlStatusCode = 403;

describe('users hook: patch.validate', () => {

  it('Patches a `user`', async () => {
    const user = await app.service('users').create({
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    await app.service('users').patch(user.id, {
      email: 'user' + new Date().getTime() + mailProvider,
      password: 'differentPassword',
      githubId: '1234567890',
      permissions: 'admin'
    });
  });

  it('A `user` with `admin` permisions can PATCH other `user`', async () => {
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
    const restUser = await app.service('users').patch(basicUser.id, {
      permissions: 'admin'
    }, params);
    // Checking if the property has been set properly
    assert.equal(restUser.permissions, 'admin');
  });

  it('A `user` with `user` permisions can not PATCH other `user`', async () => {
    const basicUser1 = await app.service('users').create({
      email: 'userOne' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    const basicUser2 = await app.service('users').create({
      email: 'userTwo' + new Date().getTime() + mailProvider,
      password: 'secret'
    });
    const params = {
      provider: 'rest',
      authenticated: true,
      user: basicUser1
    };
    try {
      await app.service('users').patch(
        basicUser2.id, {
          permissions: 'admin'
        }, params
      );
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

  notAllowedEmptyProperties.forEach(property => {
    it(
      'Throws a BadRequest when tries to update a `user` with an empty ' +
      '`' + property +'`',
      async () => {
        const user = await app.service('users').create({
          email: 'user' + new Date().getTime() + mailProvider,
          password: 'secret'
        });
        try {
          const patchObj = new Object;
          patchObj[property.toString()] = '';
          await app.service('users').patch(user.id, patchObj);
          assert.fail(expectedBadRequest);
        } catch (error) {
          if (error instanceof AssertionError) {
            throw error;
          }
          assert.equal(error.type, feathersErrorType);
          assert.equal(error.code, badRequestHtmlStatusCode);
          assert.equal(error.message, 'Please, provide a valid `' + property + '`.');
        }
      }
    );
  });
  
});