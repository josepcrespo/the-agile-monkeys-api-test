// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const users = sequelizeClient.define('users', {
  
    email: {
      type: DataTypes.STRING,
      unique: true,
      validate: {
        isEmail: true
      }
    },
    password: {
      type: DataTypes.STRING
    },
    githubId: {
      type: DataTypes.STRING
    },
    permissions: {
      type: DataTypes.STRING,
      defaultValue: 'user'
    }
  
  }, {
    hooks: {
      beforeCount(options) {
        options.raw = true;
      }
    }
  });

  // eslint-disable-next-line no-unused-vars
  users.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { customers } = models;
    users.hasMany(customers, {
      foreignKey: {
        name: 'createdById',
        allowNull: false
      }
    }); // Will add createdBy to customers model
    users.hasMany(customers, {
      foreignKey: {
        name: 'updatedById',
        allowNull: true
      }
    }); // Will add updatedBy to customers model
  };

  return users;
};
