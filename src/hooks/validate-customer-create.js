// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest, GeneralError } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (data.name === undefined || !data.name) {
      throw new BadRequest('Please, provide a customer name.');
    }

    if (data.surname === undefined || !data.surname) {
      throw new BadRequest('Please, provide a customer surname.');
    }

    if (data.createdById === undefined || !data.createdById) {
      throw new GeneralError(
        'Something went wrong on the server. Unable to associate the ID of ' +
        'the current authenticated user to the `createdById` customer field.'
      );
    }
    
    return context;
  };
};
