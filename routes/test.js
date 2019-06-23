var express = require('express');
let sequelize = require('../database/config');
var router = express.Router();

/* GET home page. */
router.get('/api/test', function (req, res, next) {
    sequelize.query("SELECT * FROM `users`", { type: sequelize.QueryTypes.SELECT })
        .then(users => {
            users.forEach(user => {
                console.log(user);
                var result = '';
                var characters = '$#%^()@.ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                var charactersLength = characters.length;
                for (var i = 0; i < 60; i++) {
                    result += characters.charAt(Math.floor(Math.random() * charactersLength));
                }
                console.log(result)
                sequelize.query("UPDATE users SET password = '" + result + "' WHERE id = '" + user.id + "'").then(([results, metadata]) => {
                    // Results will be an empty array and metadata will contain the number of affected rows.
                })
            });
            res.send({
                msg: 'done'
            })
        })
});

module.exports = router;
