// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const customers = sequelizeClient.define('customers', {
    name: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notEmpty: true
      },
      jsonSchema: {
        examples: ['Jose', 'Josep']
      }
    },
    surname: {
      type: DataTypes.STRING,
      validate: {
        isAlpha: true,
        notEmpty: true
      },
      jsonSchema: {
        examples: ['Crespo', 'Santacreu']
      }
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: true,
      jsonSchema: {
        examples: [
          '1598285916299-778318514.jpg',
          '1598284974217-418336858.png',
          '1598284173548-622901480.gif'
        ]
      }
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: true,
        isInt: true
      }
    },
    updatedById: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        isInt: true
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
  customers.associate = function (models) {
    // Define associations here
    // See http://docs.sequelizejs.com/en/latest/docs/associations/
    const { users } = models;
    customers.belongsTo(users, {
      foreignKey: {
        name: 'createdById',
        allowNull: false
      }
    });
    customers.belongsTo(users, {
      foreignKey: {
        name: 'updatedById',
        allowNull: true
      }
    });
  };

  return customers;
};
