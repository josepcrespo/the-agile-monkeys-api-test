// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if ( !data.githubId && (!data.email || !data.password) ) {
      throw new BadRequest(
        'Please, provide an email and password.'
      );
    }
    
    return context;
  };
};
