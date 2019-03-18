const lives = require('../database/models/lives');

module.exports = {
    getLives(req, res) {
        lives.findAll()
            .then(data => {
                res.send({
                    lives: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    },
    deleteLive(req, res) {
        let liveId = req.body.liveId;
        lives.destroy({where: {id: liveId}})
            .then(data => {
                res.send({
                    live: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            })
        })
    },
    addLive(req, res) {
        let {url, name} = req.body;
        lives.create({
            name: name,
            url: url
        }).then(data => {
            res.send({
                live: data
            })
        }).catch(er => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    }
};