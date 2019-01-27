const News = require('../database/models/news');
const PageModule = require('../database/models/pageModules');
const Module = require('../database/models/modules');
const Design = require('../database/models/design');
module.exports = {
    getNews(req, res) {
        News.findAll()
            .then(news => {
                res.send({
                    news: news
                });
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    error: 'something went wrong trying to get news'
                });
            })
    },
    async getNewsDetails(req, res) {
        let news_id = req.query.news_id;
        try {
            let [news, sidebarModules, mainModules, design] = await Promise.all([
                News.findByPk(news_id),
                PageModule.findAll({where: {page: 0}, include: [Module], order: ['order']}),
                PageModule.findAll({where: {page: 1}, include: [Module], order: ['order']}),
                Design.findOne({where: {type: 0}})
            ]);
            res.send({
                news: news,
                sidebarModules: sidebarModules,
                mainModules: mainModules,
                design: design
            })
        } catch (err) {
            console.log(err);
            res.status(500).send({
                error: err,
            });
        }
    }
};
