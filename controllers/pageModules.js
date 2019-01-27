const pageModule = require('../database/models/pageModules');

module.exports = {
    getPageModue(req, res) {
        let page = req.query.page;
        pageModule.findAll({
            where: {
                page: page,
            },
            order: ['order']
        }).then(data => {
            res.send({
                pageModule: data
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get pageModule from the database',
            });
        })
    },
    addPageModule(req, res) {
        let page = req.body.page;
        let module_id = req.body.module_id;
        let order = req.body.order;
        pageModule.count({
            where: {
                page: page,
                module_id: module_id,
            }
        }).then(count => {
            if (count != 0) {
                console.log("repeated");
            } else {
                pageModule.create({
                    page: page,
                    module_id: module_id,
                    order: order
                }).then(data => {
                    res.send({
                        pageModule: data,
                    });
                }).catch(err => {
                    console.log(err);
                    res.status(500).send({
                        error: 'something went wrong trying to save pageModule in the database'
                    });
                });
            }
        }).catch(err => {
            console.log(err);
            return res.status(500).send({
                error: 'something went wrong trying to query to page module database'
            })
        });
    },
    updatePageModuleOrder(req, res) {
        let id = req.body.id;
        let order = req.body.order;
        console.log("id ==> " + id);
        console.log("order ==> " + order);
        pageModule.findById(id)
            .then(result => {
                result.order = order;
                result.save()
                    .then(data => {
                        res.send({
                            pageModule: data,
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
    deletePageModule(req, res) {
        let id = req.body.id;
        pageModule.destroy({
            where: {
                id: id
            }
        }).then(data => {
            res.send({
                pageModule: data
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    getPageModuleMaxOrder(req, res) {
        let page = req.query.page;
        pageModule.max('order', {
            where: {
                page: page
            }
        }).then(max => {
            res.send({
                max: max
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        });
    }
};
