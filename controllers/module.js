const Module = require('../database/models/modules');
const moduleCategory = require('../database/models/moduleCategories');
const moduleSubCategory = require('../database/models/moduleSubCategories');

module.exports = {
    getModules(req, res) {
        Module.findAll()
            .then(modules => {
                res.send({
                    modules: modules
                })
            })
            .catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            });
    },
    getModule(req, res) {
        let id = req.query.id;
        Module.findById(id).then(module => {
            res.send({
                module: module
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err,
            })
        })
    },
    updateModule(req, res) {
        let id = req.body.id;
        let automatic = req.body.automatic;
        let newsNumber = req.body.newsNumber;
        let replaceMode = req.body.replaceMode;
        let maxActives = req.body.maxActives;
        let categories = req.body.categories;
        let subCategories = req.body.subCategories;
        let newsAutomatic = req.body.newsAutomatic;

        moduleCategory.destroy({where: {moduleId: id}});
        moduleCategory.destroy({where: {moduleId: null}});
        for (let i = 0; i < categories.length; i++) {
            moduleCategory.create({
                moduleId: id,
                categoryId: categories[i].id
            });
        }
        moduleSubCategory.destroy({where: {moduleId: id}});
        moduleSubCategory.destroy({where: {moduleId: null}});
        for (let i = 0; i < subCategories.length; i++) {
            moduleSubCategory.create({
                moduleId: id,
                subCategoryId: subCategories[i].id
            });
        }

        Module.findByPk(id)
            .then(module => {
                module.automatic = automatic;
                module.newsNumber = newsNumber;
                module.replaceMode = replaceMode;
                module.maxActives = maxActives;
                module.newsAutomatic = newsAutomatic;
                module.save()
                    .then(data => {
                        res.send({
                            module: data
                        });
                    }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: err
                    });
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    addModule(req, res) {
        let {name} = req.body;
        Module.create({
            name: name,
        }).then(module => {
            res.send({
                module: module
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
};
