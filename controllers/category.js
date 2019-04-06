const Category = require('../database/models/category');
const subCategory = require('../database/models/subCategory');
const moduleCategories = require('../database/models/moduleCategories');
const moduleSubCategories = require('../database/models/moduleSubCategories');

module.exports = {
    async getAll(req, res) {
        try {
            let [categories, subCategories] = await Promise.all([
                Category.findAll(),
                subCategory.findAll()
            ]);
            res.send({
                categories: categories,
                subCategories: subCategories
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e
            })
        }
    },
    async getModuleData(req, res) {
        let moduleId = req.body.moduleId;
        try {
            let [categories, subCategories] = await Promise.all([
                moduleCategories.findAll({where: {moduleId: moduleId}, include: [Category]}),
                moduleSubCategories.findAll({where: {moduleId: moduleId}, include: [subCategory]})
            ]);
            res.send({
                categories: categories,
                subCategories: subCategories
            })
        } catch (e) {
            console.log(e);
            res.status(500).send({
                error: e
            })
        }

    },
};