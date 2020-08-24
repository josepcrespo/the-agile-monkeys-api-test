// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { arguments } = context;

    if (
        !arguments[0].githubId &&
        (!arguments[0].email || !arguments[0].password)
    ) {
      throw new BadRequest(
        'Please, provide an email and password.'
      );
    }
    return context;
  };
};
