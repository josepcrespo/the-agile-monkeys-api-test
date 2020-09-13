// Use this hook to manipulate incoming or outgoing data.
// For more information on hooks see: http://docs.feathersjs.com/api/hooks.html

const { Forbidden } = require('@feathersjs/errors');

// eslint-disable-next-line no-unused-vars
module.exports = (options = {}) => {
  return async context => {
    // Get the User ID query parameter for the request.
    const userIdQueryParam = context.id;

    // Get authenticated user
    const user = context.params.user;

    // Disallow an admin to delete himself.
    if (user.id === parseInt(userIdQueryParam)) {
      throw new Forbidden('You are not allowed to delete your own user.');
    }

    return context;
  };
};
