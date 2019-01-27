let Sequelize = require('sequelize');
let sequelize = require('../config');

const News = sequelize.define('news', {
    id: {type: Sequelize.INTEGER(10) , primaryKey: true, autoIncrement: true},
    title: Sequelize.STRING,
    description: Sequelize.TEXT,
    point: Sequelize.INTEGER,
},{underscored: true});

module.exports = News;


