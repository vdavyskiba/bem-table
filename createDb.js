var async = require('async');
var mongoose = require('./lib/mongoose/mongoose');
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
        {_id: 2, username: 'test', email: 'test@testmail.com', active: false, balance: -10.25, name: { first:'Test', last:'user' } , details: 'link http://ya.ru'},
        {_id: 3, username: 'admin', email: 'admin@somegmail.com', created: Date.now(), name: { first:'super', last:'root' }, details: 'click to go to https://news.ycombinator.com'},
        {_id: 4, username: 'guest', email: 'guest@mail.ru', balance: 25.85, name: { first:'John', last:'Doe' }, details:'nothing' },
        {_id: 5, username: 'user', email: 'user@inbox.com', name: { first:'Jane', last:'Dow' }, details:'plain text' }
    ];

    async.each(usersData, function(userData, callback) {
        users.store(userData, callback);
    }, callback);
}

function generateStubUsers(callback){

    var count = 1000;
    var usersData = [];
    var i;

    for(i=6; i<count; i++){
        usersData.push(generateStubUserData(i));
    }

    async.each(usersData, function(userData, callback) {
        users.store(userData, callback);
    }, callback);
}

function generateStubUserData(idx){
    var name = ['user', idx, 'name'].join('');
    //for larger range of values
    var balance = Math.pow(Math.random() * 10, parseInt(Math.random() * 10));
    var random = parseInt(Math.random() * 10);

    return {
        _id: idx,
        username: name,
        email: [name, '@', (Math.random() + 1).toString(36).substring(15), '.com'].join(''),
        active: Math.random() > 0.7,
        balance: balance ? (random %2 ? -balance : balance) : 0,
        name: {
            first:'Test' + parseInt(Math.random() * 10),
            last:'user' + parseInt(Math.random() * 10)
        },
        details: random %3 ? (Math.random() + 1).toString(36).substring(random) : null
    }
}
