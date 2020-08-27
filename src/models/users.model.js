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
      },
      jsonSchema: {
        examples: ['you@someprovider.com']
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        notEmpty: true
      },
      jsonSchema: {
        examples: ['1qaz2wsx3edc4rfv']
      }
    },
    githubId: {
      type: DataTypes.STRING,
      validate: {
        isInt: true
      },
      jsonSchema: {
        examples: ['3214895']
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
      },
      jsonSchema: {
        examples: ['admin', 'user']
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
