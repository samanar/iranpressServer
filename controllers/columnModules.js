const ColumnModules = require('../database/models/columnModules');

module.exports = {
    changeShowTitle(req, res) {
        let column_module_id = req.body.column_module_id;
        let show_title = req.body.show_title;
        ColumnModules.findByPk(column_module_id).then(module => {
            module.show_title = show_title;
            module.save().then(data => {
                res.send({
                    columnModule: data
                })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                });
            })
        })
    },
    updateSwiperSetting(req, res) {
        let {
            id,
            swiperAnimations,
            swiperInterval,
            swiperAutomatic,
            showTag,
            tagText
        } = req.body;
        ColumnModules.findByPk(id)
            .then(data => {
                data.swiperAnimations = swiperAnimations;
                data.swiperInterval = swiperInterval;
                data.swiperAutomatic = swiperAutomatic;
                data.showTag = showTag;
                data.tagText = tagText;
                data.save()
                    .then(result => {
                        res.send({
                            columnModule: result
                        })
                    }).catch(err => {
                        console.log(err);
                        res.status(500).send({
                            error: err
                        })
                    })
            }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: err
                })
            })
    }
};