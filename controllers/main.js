const MainRows = require('../database/models/mainRows');
const Module = require('../database/models/modules');
const RowColumns = require('../database/models/rowColumns');
const ModuleNews = require('../database/models/module_news');
const News = require('../database/models/news');
const columnModules = require('../database/models/columnModules');
const Image = require('../database/models/Images');
module.exports = {
    async getMain(req, res) {
        let pageId = req.query.page ? req.query.page : 1;
        let mainRows = await MainRows.findAll({
            where: {pageId: pageId},
            include: [
                {
                    model: RowColumns,
                    include: [
                        {
                            model: columnModules,
                            include: [{
                                model: Module,
                                include: [{
                                    model: ModuleNews, required: false, where: {status: 1},
                                    include: [{
                                        model: News, include: [
                                            {
                                                model: Image, required: false
                                            }
                                        ]
                                    }]
                                }]
                            }],

                        }
                    ]
                }
            ],
            order: [
                ['order'],
                [RowColumns, 'id', 'asc'],
                [{model: RowColumns}, {model: columnModules}, 'id', 'asc'],
            ],
        });
        res.send({
            mainRows: mainRows
        })
    }
};
