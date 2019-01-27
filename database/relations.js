const News = require('./models/news');
const Module = require('./models/modules');
const ModuleNews = require('./models/module_news');
const Design = require('./models/design');
const User = require('./models/users');
const Comment = require('./models/comments');
const pageModules = require('./models/pageModules');
const mainRow = require('./models/mainRows');
const rowColumn = require('./models/rowColumns');
const columnModules = require('./models/columnModules');
const sequelize = require('./config');


Module.hasMany(ModuleNews);
News.hasMany(ModuleNews);
User.hasMany(Comment);
Comment.belongsTo(User);
pageModules.belongsTo(Module);
ModuleNews.belongsTo(Module);
ModuleNews.belongsTo(News);
mainRow.hasMany(rowColumn);
columnModules.belongsTo(rowColumn);
columnModules.belongsTo(Module);
rowColumn.hasMany(columnModules);
Module.hasMany(columnModules);


sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

sequelize.sync()
    .then(() => {
        console.log("created successfullly");
    })
    .catch(err => {
        console.log('someting went wrong trying to create database tables');
    });


