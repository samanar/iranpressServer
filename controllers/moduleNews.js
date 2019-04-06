const Module = require('../database/models/modules');
const ModuleNews = require('../database/models/module_news');
const News = require('../database/models/news');
const sequalize = require('../database/config');
const Sequelize = require('sequelize');

let self = module.exports = {
    getModuleNews(req, res) {
        let module_id = req.query.module_id;
        ModuleNews.findAll({
            where: {
                moduleId: module_id,
            },
            include: [News],
        }).then(data => {
            return res.send({
                moduleNews: data,
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get module News from the database',
            });
        })
    },
    async deactivateModuleNews(req, res) {
        let id = req.body.id;

        ModuleNews.findByPk(id).then(result => {
            result.status = 0;
            result.active_since = null;
            result.save().then(() => {
                res.send(result);
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: 'something went wrong trying to update ModuleNews'
                });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get ModuleNews from the database',
            })
        })
    },
    activateModuleNews: function (req, res) {
        let id = req.body.id;

        ModuleNews.findByPk(id).then(result => {
            result.status = 1;
            result.active_since = new Date();
            result.save().then(() => {
                res.send(result);
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: 'something went wrong trying to update ModuleNews'
                });
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get ModuleNews from the database',
            })
        })
    },
    replaceNews: async function (module_id, replaceMode) {
        try {
            let module = await Module.findByPk(module_id);
            let active_news = await ModuleNews.findAll({
                where: {status: 1, moduleId: module_id},
                order: [['active_since']],
                include: [News]
            });
            console.log(active_news.length);
            if (module.maxActives > active_news.length) {
                console.log("maxActives is bigger so there is no need to replace news");
                return;
            }
            if (!active_news.length)
                return;
            switch (replaceMode) {
                case 0:
                    let min_score = active_news[0].news.point;
                    for (let i = 1; i < active_news.length; i++) {
                        if (active_news[i].news.point < min_score)
                            min_score = active_news[i].news.point;
                    }

                    for (let i = 0; i < active_news.length; i++) {
                        if (active_news[i].news.point == min_score) {
                            active_news[i].status = 0;
                            active_news[i].active_since = null;
                            await active_news[i].save();
                            break;
                        }
                    }
                    break;
                case 1:
                    //oldest active_since
                    active_news[0].status = 0;
                    active_news[0].active_since = null;
                    await active_news[0].save();
                    break;
                case 2:
                    //oldest news create date
                    let least_create_date = active_news[0].news.created_at;
                    for (let i = 1; i < active_news.length; i++) {
                        if (active_news[i].news.created_at < least_create_date)
                            least_create_date = active_news[i].news.created_at;
                    }

                    for (let i = 0; i < active_news.length; i++) {
                        if (active_news[i].news.created_at == least_create_date) {
                            active_news[i].status = 0;
                            active_news[i].active_since = null;
                            await active_news[i].save();
                            break;
                        }
                    }
                    break;
            }
        } catch (err) {
            throw(err)
        }

    },
    addModuleNewsExport: async function (module, news) {
        console.log("addModuleNewsExport");
        return new Promise(async function (resolve, reject) {
            try {
                news.status = 3;
                await news.save();
                let count = await ModuleNews.count({where: {moduleId: module.id, newsId: news.id,}});
                if (count !== 0) {
                    console.log("news already there");
                    reject(false);
                } else {
                    if (module.automatic) {
                        await self.replaceNews(module.id, module.replaceMode);
                        ModuleNews.create({
                            moduleId: module.id,
                            newsId: news.id,
                            active_since: new Date(),
                            status: 1
                        }).then(module_news => {
                            resolve(module_news);
                        }).catch(err => {
                            reject(err)
                        });
                    } else {
                        ModuleNews.create({
                            moduleId: module.id,
                            newsId: news.id,
                            active_since: null,
                            status: 0
                        }).then(module_news => {
                            resolve(module_news)
                        }).catch(err => {
                            reject(err)
                        });
                    }
                }
            } catch (err) {
                reject(err)
            }
        });

    },
    addModuleNews: async function (req, res) {
        let module_id = req.body.module_id;
        let news_id = req.body.news_id;
        News.findByPk(news_id).then(news => {
            news.status = 3;
            news.save();
        });
        try {
            let count = await ModuleNews.count({where: {moduleId: module_id, newsId: news_id,}});
            let module = await Module.findByPk(module_id);
            if (count !== 0) {
                res.send({
                    msg: 'news already exists',
                })
            } else {
                if (module.automatic) {
                    await self.replaceNews(module.id, module.replaceMode);
                    ModuleNews.create({
                        moduleId: module_id,
                        newsId: news_id,
                        active_since: new Date(),
                        status: 1
                    }).then(module_news => {
                        res.send({
                            moduleNews: module_news
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({
                            error: err
                        });
                    });
                } else {
                    ModuleNews.create({
                        moduleId: module_id,
                        newsId: news_id,
                        active_since: null,
                        status: 0
                    }).then(module_news => {
                        res.send({
                            moduleNews: module_news
                        });
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({
                            error: err
                        });
                    });
                }
            }

        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err
            });
        }
    },
    async getActiveModules(req, res) {
        let module_id = req.query.module_id;
        try {
            let [module, moduleNews] = await Promise.all([
                Module.findByPk(module_id),
                ModuleNews.findAll({where: {moduleId: module_id, status: 1}, include: [News]})
            ]);
            res.send({
                module: module,
                moduleNews: moduleNews
            })
        } catch (err) {
            res.status(500).send({
                error: err
            });
        }

    }
};
