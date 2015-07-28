var async = require('async');
var users = require('../../services/users');

exports.TestUserService = function(test){

    var userData = {
        username: 'uerservicetesttempuser',
        email: 'uerservicetesttempuser@testmail.com'
    };

    var userId;

    async.series([
        store,
        restore,
        query,
        remove,
        cantfind
    ], function(err) {
        if (err) throw err;
        test.done();
    });

    function store(callback){
        users.store(userData, function(err, user){
            test.equals(err, null, 'expect no errors');
            test.ok(user, 'stored user should exist');
            userId = user.id;
            callback();
        });
    }

    function restore(callback){
        users.restore(userId, function(err, user){
            test.equals(err, null, 'expect no errors');
            test.ok(user, 'restored user should exist');
            callback();
        });
    }

    function query(callback){
        users.query({}, function(err, users){
            test.equals(err, null, 'expect no errors');
            test.ok(users.length, 'fetched user should exist');
            callback();
        });
    }

    function remove(callback){
        users.remove(userId, function(err, user){
            test.equals(err, null, 'expect no errors');
            test.ok(user, 'removed user should exist');
            callback();
        });
    }

    function cantfind(callback){
        users.restore(userId, function(err, user){
            test.equals(err, null, 'no errors expect');
            test.equals(user, null, 'no user expected');
            callback();
        });
    }

};
