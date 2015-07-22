var mongoose = require('./lib/mongoose');
var async = require('async');

async.series([
    open,
    dropDatabase,
    requireModels,
    createUsers,
    generateStubUsers
], function(err) {
    console.log(arguments);
    mongoose.disconnect();
    process.exit(err ? 255 : 0);
});

function open(callback) {
    mongoose.connection.on('open', callback);
}

function dropDatabase(callback) {
    var db = mongoose.connection.db;
    db.dropDatabase(callback);
}

function requireModels(callback) {
    require('./models/user');

    async.each(Object.keys(mongoose.models), function(modelName, callback) {
        mongoose.models[modelName].ensureIndexes(callback);
    }, callback);
}

function createUsers(callback) {

    var users = [
        {username: 'admin', email: 'admin@gmail.com', created: Date.now(), name: { first:'super', last:'root' }, details: 'click to go to https://news.ycombinator.com'},
        {username: 'test', email: 'test@mymail.com', active: false, balance: -10.25, name: { first:'Test', last:'User' } },
        {username: 'guest', email: 'guest@mail.ru', balance: 25.85, name: { first:'John', last:'Doe' } },
        {username: 'user', email: 'user@inbox.com', name: { first:'Jane', last:'Doe' } }
    ];

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}

function generateStubUsers(callback) {

    var count = 150;
    var users = [];

    function generateUser(i){
        var name = ['user', i].join('');
        var balance = Math.random() * 100;
        return {
            username: name,
            email: [name, '@mymail.com'].join(''),
            active: i%7,
            balance: i%3 ? -balance : balance
        }
    }

    while(count--){
        users.push(generateUser(count));
    }

    async.each(users, function(userData, callback) {
        var user = new mongoose.models.User(userData);
        user.save(callback);
    }, callback);
}