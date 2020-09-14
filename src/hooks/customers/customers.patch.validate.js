// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (data.name !== undefined && !data.name) {
      throw new BadRequest('Please, provide a valid `name`.');
    }

    if (data.surname !== undefined && !data.surname) {
      throw new BadRequest('Please, provide a valid `surname`.');
    }
    
    return context;
  };
};
