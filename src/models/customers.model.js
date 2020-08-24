// See http://docs.sequelizejs.com/en/latest/docs/models-definition/
// for more of what you can do here.
const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;

module.exports = function (app) {
  const sequelizeClient = app.get('sequelizeClient');

  const customers = sequelizeClient.define('customers', {
    name: {
      type: DataTypes.STRING
    },
    surname: {
      type: DataTypes.STRING
    },
    photo: {
      type: DataTypes.STRING
    },
    createdById: {
      type: DataTypes.INTEGER,
      allowNull: true
    },
    updatedById: {
      type: DataTypes.INTEGER
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
    }); // Will add createdBy to customers model
    customers.belongsTo(users, {
      foreignKey: {
        name: 'updatedById',
        allowNull: true
      }
    }); // Will add updatedBy to customers model
  };

  return customers;
};
