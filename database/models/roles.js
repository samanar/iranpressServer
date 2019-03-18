const sequelize = require('../config');
const Sequelize = require('sequelize');

module.exports = sequelize.define('siteRoles', {
    id: {type: Sequelize.INTEGER, primaryKey: true, autoIncrement: true},
    name: Sequelize.STRING,
    description: Sequelize.STRING,

    //dashboard
    dashboardOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false,
    },
    dashboardRead: {
        type: Sequelize.BOOLEAN, defaultValue: false,
    },
    //news
    newsOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    newsRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    newsSend: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    newsReject: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
//    comments
    commentsOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    commentsAction: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    commentsRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
//    live feeds
    liveFeedsOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    liveRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    liveCreate: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
//    modules
    modulesOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    modulesRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    modulesCreate: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    modulesActive: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    modulesSetting: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
//    menus
    menusOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    menusRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    headerSetting: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    footerSetting: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    //designs
    designOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    designCreate: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    designRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    designSetting: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    //roles
    rolesOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    rolesRead: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    rolesCreate: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    rolesChange: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    //users
    usersOverall: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    usersCreate: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
    usersDelete: {
        type: Sequelize.BOOLEAN, defaultValue: false
    },
}, {timestamps: false});
