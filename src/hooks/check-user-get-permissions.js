// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // Get authenticated user
    const user = context.params.user;

    // This hook has a singular behavior and, we need to check
    // the `user` object before using it. More info here:
    // https://github.com/feathersjs/feathers/issues/1392#issuecomment-500469261
    if (user) {
      // Get the User ID query parameter for the request
      const userIdQueryParam = context.id;
        
      // Users without 'admin' permission,
      // can only get information about their own user.
      if (user.permissions !== 'admin' && 
        user.id !== parseInt(userIdQueryParam)
      ) {
        throw new Forbidden('You do not have the correct permissions.');
      }
    }
    return context;
  };
};
