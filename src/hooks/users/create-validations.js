// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { BadRequest } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    const { data } = context;

    if (!data.githubId) {
      if (!data.email && !data.password) {
        throw new BadRequest(
          'Please, provide an `email` and `password`.'
        );        
      } else {
        if (!data.email) {
          throw new BadRequest(
            'Please, provide an `email`.'
          );
        } else if (!data.password) {
          throw new BadRequest(
            'Please, provide a `password`.'
          );
        }
      }
    }
    
    return context;
  };
};
