var router = require('express').Router();
var users = require('../services/users');

router.get('/fetch', function(req, res, next) {
    users.query(req.query, function (err, users) {
        if (err) {
            res.sendStatus(500);
            return next(500);
        }
        res.json(users);
    });
});

router.get('/get/:id', function(req, res, next) {
    users.restore(req.params.id, function(err, user) {
        if (err) {
            res.sendStatus(500);
            return next(500);
        }
        if (!user) {
            res.sendStatus(404);
            return next(500);
        }
        res.json(user);
    });
});

module.exports = router;
