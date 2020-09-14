// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (
      (data.email !== undefined && !data.email) &&
      // The following check allows the `/oauth/github` service
      // to authenticate a user using the GitHub OAuth login,
      // without requiring an email.
      (data.githubId === undefined || !data.githubId)
    ) {
      throw new BadRequest('Please, provide a valid `email`.');
    }

    if (data.password !== undefined && !data.password) {
      throw new BadRequest('Please, provide a valid `password`.');
    }

    if (data.githubId !== undefined && !data.githubId) {
      throw new BadRequest('Please, provide a valid `githubId`.');
    }

    if (data.permissions !== undefined && !data.permissions) {
      throw new BadRequest('Please, provide a valid `permissions`.');
    }
    
    return context;
  };
};
