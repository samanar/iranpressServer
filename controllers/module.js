const Module = require('../database/models/modules');

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

        Module.findById(id)
            .then(module => {
                module.automatic = automatic;
                module.newsNumber = newsNumber;
                module.replaceMode = replaceMode;
                module.maxActives = maxActives;
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
    }
};
