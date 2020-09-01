const { AuthenticationService, JWTStrategy } = require('@feathersjs/authentication');
const { LocalStrategy } = require('@feathersjs/authentication-local');
const { expressOauth, OAuthStrategy } = require('@feathersjs/authentication-oauth');

class GitHubStrategy extends OAuthStrategy {
  async getEntityData(profile) {
    const baseData = await super.getEntityData(profile);

    return {
      ...baseData,
      // The user email address (if publicly available)
      email: profile.email
    };
  }
}

module.exports = app => {
  const authentication = new AuthenticationService(app);

  authentication.register('jwt', new JWTStrategy());
  authentication.register('local', new LocalStrategy());
  authentication.register('github', new GitHubStrategy());

  // The Swagger definition.
  authentication.docs = {
    description: 'Service to manage authentication.',
    definitions: {
      authentication: {
        type: 'object',
        required: ['strategy'],
        properties: {
          strategy: {
            type: 'string',
            enum: ['jwt', 'local', 'github'],
            example: 'local',
            description: 'Type of strategy used to validate the user credentials.'
          },
          email: {
            type: 'string',
            example: 'hello@emailprovider.com'
          },
          password: {
            type: 'string',
            example: '1qazxsw23edcvfr4'
          }
        }

      }
    }
  };

  app.use('/authentication', authentication);
  app.configure(expressOauth());
};

