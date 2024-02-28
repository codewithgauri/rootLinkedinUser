// Subscription.js
const { DataTypes } = require('sequelize');

module.exports = (sequelize, Sequelize) => {
  const Subscription = sequelize.define('Subscription', {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    planName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    price: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    providerKey: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    validFrom: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    validUpto: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Users',
        key: 'id',
      },
    },
  }, {
    timestamps: true,
    createdAt: 'createdAt',
    updatedAt: 'updatedAt',
  });

  return Subscription;
};
