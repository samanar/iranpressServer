const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('banner', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    image: Sequelize.STRING,
    height: Sequelize.INTEGER,
    redirect: Sequelize.INTEGER
}, {timestamps: false});
