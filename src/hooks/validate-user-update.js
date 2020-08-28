// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (
      data.email !== undefined && !data.email &&
      (data.githubId === undefined || !data.githubId)
    ) {
      throw new BadRequest('Please, provide an email address.');
    }

    if (data.password !== undefined && !data.password) {
      throw new BadRequest('Please, provide a password.');
    }

    if (data.githubId !== undefined && !data.githubId) {
      throw new BadRequest('Please, provide a GitHub ID.');
    }
    
    return context;
  };
};
