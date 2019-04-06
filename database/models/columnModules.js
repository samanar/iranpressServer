const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('column_modules', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    module_type: {
        type: Sequelize.INTEGER,
        defaultValue: 0
    },
    default: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    defaultType: {
        // 1 --> banner
        // 2 --> redirects
        // 3 --> lives
        // 4 --> weather
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    defaultId: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
    },
    show_title: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    showTag: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
    },
    tagText: {
        type: Sequelize.INTEGER,
        defaultValue: 1
    },
    swiperAutomatic: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    },
    swiperInterval: {
        type: Sequelize.INTEGER,
        defaultValue: 3000
    },
    swiperAnimations: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
    }

}, {
    timestamps: false
});