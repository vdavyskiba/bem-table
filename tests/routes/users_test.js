var async = require('async');
var api = require('hippie');
var app = require('../../app');
var users = require('../../services/users');

module.exports = {
    'TestUsersBaseRouting': function (test) {
        api(app)
            .json()
            .get('/users/fetch')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                test.equals(err, null, 'expect no errors');
                test.ok(body, 'body should exist');
                test.done();
            });
    },
    'TestUsersPagingRouting': function (test) {
        api(app)
            .json()
            .get('/users/fetch?page=1&count=10')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                test.equals(err, null, 'expect no errors');
                test.ok(body, 'body should exist');
                test.done();
            });
    },
    'TestNotExistedUserViaUsersGetByIdRouting': function (test) {
        api(app)
            .get('/users/get/9998')
            .expectStatus(404)
            .end(function(err, res, body) {
                if (err) throw err;
                test.equals(err, null, 'expect no errors');
                test.ok(body, 'body should exist');
                test.done();
            });
    },
    'TestExistedUserViaUsersGetByIdRouting': function (test) {

        var userData = {
            _id: 9999,
            username: 'uersroutestesttempuser',
            email: 'uersroutestesttempuser@testmail.com'
        };

        var userId;

        async.series([
            store,
            fetch,
            cleanup
        ], function(err) {
            if (err) throw err;
            test.done();
        });

        function store(callback){
            users.store(userData, function(err, user){
                test.equals(err, null, 'expect no errors');
                test.ok(user, 'stored user should exist');
                console.log(user);
                userId = user.id;
                callback();
            });
        }

        function fetch(callback){
            api(app)
                .json()
                .get('/users/get/' + userId)
                .expectStatus(200)
                .end(function(err, res, body) {
                    if (err) throw err;
                    test.equals(err, null, 'expect no errors');
                    test.ok(body, 'body should exist');
                    callback();
                });
        }

        function cleanup(callback){
            users.remove(userId, callback);
        }


    }
};
