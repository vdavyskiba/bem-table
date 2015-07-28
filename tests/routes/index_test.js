var api = require('hippie');
var app = require('../../app');

module.exports = {
    'TestIndexRoute': function (test) {
        api(app)
            .get('/')
            .expectStatus(200)
            .end(function(err, res, body) {
                if (err) throw err;
                test.equals(err, null, 'expect no errors');
                test.ok(body, 'body should exist');
                test.done();
            });
    }
};