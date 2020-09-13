// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (!data.name && !data.surname) {
      throw new BadRequest('Please, provide a `name` and, a `surname`.');
    } else {
      if (!data.name) {
        throw new BadRequest('Please, provide a `name`.');
      }
      if (!data.surname) {
        throw new BadRequest('Please, provide a `surname`.');
      }
    }
    
    return context;
  };
};
