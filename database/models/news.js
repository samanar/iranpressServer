let Sequelize = require('sequelize');
let sequelize = require('../config');

const News = sequelize.define('news', {
    id: {
        type: Sequelize.INTEGER(10),
        primaryKey: true,
        autoIncrement: true
    },
    title: {
        type: Sequelize.STRING,
    },
    title2: {
        type: Sequelize.STRING,
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
    MessageSubject: {
        type: Sequelize.TEXT
    },
    messageBody: {
        type: Sequelize.TEXT
    },
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
});

module.exports = News;