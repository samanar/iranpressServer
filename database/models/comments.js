const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('comments', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    status: {
        type: Sequelize.INTEGER , defaultValue: 0
    },

}, {underscore: true});
