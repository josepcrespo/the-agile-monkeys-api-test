const { Service } = require('feathers-sequelize');

exports.Customers = class Customers extends Service {
  create (data, params) {
    // This is the information we want from the user signup data
    const { name, surname, photo } = data;
    // The complete user
    const userData = {
      name,
      surname,
      photo
    };

    // Call the original `create` method with existing `params` and new data
    return super.create(userData, params);
  }
};
