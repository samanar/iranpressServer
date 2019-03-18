const siteUser = require('../database/models/siteUsers');
let bcrypt = require('bcryptjs');


let self = module.exports = {
    getUsers(req, res) {
        siteUser.findAll()
            .then(data => {
                res.send({
                    users: data
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    usernameExists(username) {
        return new Promise(function (resolve, reject) {
            siteUser.count({
                where: {username: username}
            }).then(c => {
                if (c !== 0) {
                    resolve(true)
                } else {
                    resolve(false)
                }
            }).catch(err => {
                reject(err);
            })
        });

    },
    async addUser(req, res) {
        let {username, password} = req.body;
        let status = await self.usernameExists(username);
        if (status) {
            return res.send({
                error: 1,
                message: 'username already exists'
            })
        } else {
            bcrypt.genSalt(10, function (err, salt) {
                bcrypt.hash(password, salt, function (err, hash) {
                    if (err) {
                        console.log(err);
                        res.staus(500).send({
                            error: err
                        })
                    } else {
                        siteUser.create({
                            username: username,
                            password: hash
                        }).then(data => {
                            res.send({
                                error: 0,
                                user: data
                            })
                        }).catch(err => {
                            console.log(err);
                            res.status(500).send({
                                error: err
                            })
                        })
                    }
                });
            });
        }
    },
    deleteUser(req, res) {
        let id = req.body.id;
        siteUser.destroy({where: {id: id}})
            .then(data => {
                res.send({
                    status: 'done'
                })
            }).catch(err => {
            console.log(err);
            res.status(500).send({
                error: err
            });
        })
    },
    changeRole(req ,res) {
        let id = req.body.id;
        // let role = req.body.role;
    }
};