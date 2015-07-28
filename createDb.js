var async = require('async');
var mongoose = require('./lib/mongoose');
var users = require('./services/users');

async.series([
    open,
    dropDatabase,
    requireModels,
    createTestUsers,
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

function createTestUsers(callback) {

    var usersData = [
        {username: 'test', email: 'test@testmail.com', active: false, balance: -10.25, name: { first:'Test', last:'user' } , details: 'link http://ya.ru'},
        {username: 'admin', email: 'admin@somegmail.com', created: Date.now(), name: { first:'super', last:'root' }, details: 'click to go to https://news.ycombinator.com'},
        {username: 'guest', email: 'guest@mail.ru', balance: 25.85, name: { first:'John', last:'Doe' } },
        {username: 'user', email: 'user@inbox.com', name: { first:'Jane', last:'Doe' } }
    ];

    async.each(usersData, function(userData, callback) {
        users.store(userData, callback);
    }, callback);
}

function generateStubUsers(callback){

    var count = 1500;
    var usersData = [];

    while(count--){
        usersData.push(generateStubUserData('user' + count));
    }

    async.each(usersData, function(userData, callback) {
        users.store(userData, callback);
    }, callback);
}

function generateStubUserData(name){
    //for larger range of values
    var balance = Math.pow(Math.random() * 10, parseInt(Math.random() * 10));
    var random = parseInt(Math.random() * 10);
    return {
        username: name,
        email: [name, '@mymail.com'].join(''),
        active: Math.random() > 0.7,
        balance: balance ? (random %2 ? -balance : balance) : 0,
        name: {
            first:'Test',
            last:'user'
        }
    }
}