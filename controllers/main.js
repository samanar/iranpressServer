const MainRows = require('../database/models/mainRows');
const Module = require('../database/models/modules');
const RowColumns = require('../database/models/rowColumns');
const ModuleNews = require('../database/models/module_news');
const News = require('../database/models/news');
const columnModules = require('../database/models/columnModules');
const Image = require('../database/models/Images');
const mainPhoto = require('../database/models/mainPhoto');
const Category = require('../database/models/category');
const SubCategory = require('../database/models/subCategory');
const moduleCategory = require('../database/models/moduleCategories');
const moduleSubCategory = require('../database/models/moduleSubCategories');
const Tag = require('../database/models/tag');

//controllers
const moduleNewsController = require('./moduleNews');


let self = module.exports = {
    async getMain(req, res) {
        let pageId = req.query.page ? req.query.page : 1;
        let mainRows = await MainRows.findAll({
            where: {
                pageId: pageId
            },
            include: [{
                model: RowColumns,
                include: [{
                    model: columnModules,
                    include: [{
                        model: Module,
                        required: false,
                        include: [{
                            model: ModuleNews,
                            required: false,
                            where: {
                                status: 1
                            },
                            include: [{
                                model: News,
                                include: [{
                                    model: mainPhoto,
                                    required: false
                                }, {
                                    model: Category,
                                    required: false
                                }, {
                                    model: SubCategory,
                                    required: false
                                }, {
                                    model: Tag,
                                    required: false
                                }]
                            }]
                        }]
                    }],

                }]
            }],
            order: [
                ['order'],
                [RowColumns, 'id', 'asc'],
                [{
                    model: RowColumns
                }, {
                    model: columnModules
                }, 'id', 'asc'],
            ],
        });
        res.send({
            mainRows: mainRows
        })
    },

    async automaticAssignment(req, res) {
        //Todo : remove category and subcategory models if not necessary
        //Todo : check for automatic activating of assigned news
        //Todo : change news status after assigning
        //Todo : check for priorities
        let [modules, news] = await Promise.all([
            Module.findAll({
                where: {
                    newsAutomatic: 1
                },
                include: [{
                    model: moduleCategory
                },
                {
                    model: moduleSubCategory
                }
                ]
            }),
            News.findAll({
                where: {
                    status: 2
                },
                include: [{
                    model: Category
                },
                {
                    model: SubCategory
                }
                ]
            })
        ]);


        await Promise.all(modules.map(module => {
            if (module.moduleCategories.length) {
                news.map(item => {
                    module.moduleCategories.map(moduleCat => {
                        item.categories.map(itemCat => {
                            if (moduleCat.categoryId === itemCat.id) {
                                moduleNewsController.addModuleNewsExport(module, item)
                                    .then(data => {
                                        console.log("module news created for --> " + itemCat.title + " between module:news " + module.id + ":" + item.id)
                                    }).catch(err => {
                                        console.log(err);
                                        console.log("something bad happened")
                                    })
                            }
                        });
                    });
                    module.moduleSubCategories.map(moduleSubCat => {
                        item.subCategories.map(itemSubCat => {
                            if (moduleSubCat.subCategoryId === itemSubCat.id) {
                                moduleNewsController.addModuleNewsExport(module, item)
                                    .then(data => {
                                        console.log("module news created for --> " + itemSubCat.title + " between module:news " + module.id + ":" + item.id)
                                    }).catch(err => {
                                        console.log(err);
                                        console.log("something bad happened")
                                    })
                            }
                        });

                    })
                });
            } else {
                // no categories in moduleCategories
                console.log("no categories found");
                return false;
            }
        }));

        res.send({
            module: modules,
            news: news
        });

    }
};