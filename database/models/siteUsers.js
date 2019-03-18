const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('siteUsers', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    username: Sequelize.STRING,
    password: Sequelize.STRING
});
