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
        isEmail: true,
        notEmpty: true
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      }
    },
    githubId: {
      type: DataTypes.STRING,
      validate: {
        isInt: true
      }
    },
    permissions: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: 'user',
      validate: {
        isIn: [['admin', 'user']],
        notEmpty: true,
        notNull: true
      }
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
    });
    users.hasMany(customers, {
      foreignKey: {
        name: 'updatedById',
        allowNull: true
      }
    });
  };

  return users;
};
