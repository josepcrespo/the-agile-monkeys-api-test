// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (data.email !== undefined && !data.email) {
      throw new BadRequest('Please, provide valid `email`.');
    }

    if (data.password !== undefined && !data.password) {

      throw new BadRequest('Please, provide valid `password`.');
    }

    if (data.githubId !== undefined && !data.githubId) {
      throw new BadRequest('Please, provide valid `githubId`.');
    }

    if (data.permissions !== undefined && !data.permissions) {
      throw new BadRequest('Please, provide valid `permissions`.');
    }
    
    return context;
  };
};
