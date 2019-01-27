const MainRows = require('../database/models/mainRows');
const Module = require('../database/models/modules');
const RowColumns = require('../database/models/rowColumns');
const ModuleNews = require('../database/models/module_news');
const News = require('../database/models/news');
const columnModules = require('../database/models/columnModules');

module.exports = {
    async getMain(req, res) {
        let mainRows = await MainRows.findAll({
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
                                    include: [News]
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
