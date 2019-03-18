let Sequelize = require('sequelize');
let sequelize = require('../config');

const News = sequelize.define('news', {
    id: {type: Sequelize.INTEGER(10), primaryKey: true, autoIncrement: true},
    title: Sequelize.STRING,
    point: {
        type: Sequelize.INTEGER
    },
    score: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    viewed: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    source: {
        type: Sequelize.STRING
    },
    lead: {
        type: Sequelize.TEXT
    },
    content: {
        type: Sequelize.TEXT
    },
    status: {
        type: Sequelize.INTEGER,

    },
    message: {
        type: Sequelize.TEXT
    },
    createdBy: {
        type: Sequelize.STRING
    },

} );

module.exports = News;


