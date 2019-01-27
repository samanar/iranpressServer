const Design = require('../database/models/design');

module.exports = {
    getDesign(req, res) {
        let type = req.query.type;
        Design.count({
            where: {
                type: type
            }
        }).then(count => {
            if (count == 0)
                Design.create({
                    type: type
                });
        }).catch(err => {
            console.log(err)
        });
        Design.findOne({
            where: {
                type: type
            }
        }).then(result => {
            res.send({
                design: result
            });
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get design from the database',
            })
        })
    },
    updateDesign(req, res) {
        let type = req.body.type;
        let sidebar = req.body.sidebar;
        let sidebar_size = req.body.sidebar_size;
        let direction = req.body.direction;
        Design.findOne({
            where: {
                type: type,
            }
        }).then(design => {
            design.sidebar = sidebar;
            design.sidebar_size = sidebar_size;
            design.direction = direction;
            design.save()
                .then(design => {
                    res.send({
                        design: design
                    });
                }).catch(err => {
                console.log(err);
                res.status(500).send({
                    error: 'something went wrong trying to update the design',
                })
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get design from the database'
            })
        });
    },
    getOrders(req, res) {
        let type = req.query.type;
        Design.findOne({
            where: {
                type: type,
            }
        }).then(result => {
            console.log(result);
            res.send({
                commentsOrder: result.commentsOrder,
                newsOrder: result.newsOrder
            })
        }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: 'something went wrong trying to get design from the database'
            })
        })
    }
};
