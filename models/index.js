const Sequelize = require('sequelize');
const config = require('../config/config.json');
const UserModel = require('./users');
const SubscriptionModel = require('./Subscriptions');
const env = process.env.NODE_ENV || 'dev';
const sequelizeConfig = config[env];

const sequelize = new Sequelize(
    sequelizeConfig.database,
    sequelizeConfig.username,
    sequelizeConfig.password,
    {
        host: sequelizeConfig.host,
        dialect: sequelizeConfig.dialect,
        dialectOptions: sequelizeConfig.dialectOptions,
        timezone: sequelizeConfig.timezone
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = UserModel(sequelize, Sequelize);
db.Subscription = SubscriptionModel(sequelize, Sequelize);

db.sequelize.sync()
  .then(() => {
    console.log('Tables synced successfully.');
  })
  .catch(err => {
    console.error('Error syncing tables:', err);
  });

db.sequelize.authenticate()
  .then(() => {
    console.log('Connection to the database has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

module.exports = db;
