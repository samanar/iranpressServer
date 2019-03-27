const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('column_modules', {
        id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
        module_type: {
            type: Sequelize.INTEGER, defaultValue: 0
        },
        default: {
            type: Sequelize.BOOLEAN, defaultValue: false
        },
        defaultType: {
            // 1 --> banner
            // 2 --> redirects
            // 3 --> lives
            // 4 --> weather
            type: Sequelize.INTEGER, defaultValue: 1
        },
        show_title: {
            type: Sequelize.BOOLEAN, defaultValue: true
        },
    },
    {timestamps: false}
);
