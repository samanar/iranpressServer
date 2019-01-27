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
    }
};
