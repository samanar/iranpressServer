const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('site_urssers', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},

}, {underscore: true});
