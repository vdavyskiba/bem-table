var express = require('express');
var router = express.Router();
var User = require('../models/user').User;
var ObjectID = require('mongodb').ObjectID;

var PAGE_SIZE = 10;


/* GET users listing. */

router.get('/:page?', function(req, res) {
    var page  = (req.params.page || 0) * PAGE_SIZE;
    var query = User.find();
    query.skip(page).limit(PAGE_SIZE);
    query.exec(function (err, users) {
        if (err) throw err;
        res.json(users);
    });
});

/* GET user by id */
router.get('/get/:id', function(req, res, next) {
    try {
        var id = new ObjectID(req.params.id);
    } catch (e) {
        next(404);
        return;
    }

    User.findById(id, function(err, user) { // ObjectID
        if (err) return next(err);
        if (!user) {
            return next(404);
        }
        res.json(user);
    });
});

module.exports = router;