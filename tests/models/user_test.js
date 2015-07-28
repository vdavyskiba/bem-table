var user = require('../../models/user').User;

module.exports = {
    'TestModelFields': function(test){

        var userData = {
            username: 'usermodeltesttempuser',
            email: 'usermodeltesttempuser@somemail.com',
            created: new Date(),
            balance: 1,
            active: true,
            name: {
                first: 'temp',
                last: 'users'
            },
            details: 'test text'
        };

        var currentUser = new user(userData);

        test.equals(currentUser.username, userData.username, "user should have same field 'username'");
        test.equals(currentUser.email, userData.email, "user should have same field 'email'");
        test.equals(currentUser.balance, userData.balance, "user should have default field 'balance' to be 0");
        test.equals(currentUser.active, userData.active, "user should have default field 'active' to be true");
        test.equals(currentUser.created, userData.created, "user should have default field 'created'");
        test.equals(currentUser.name.first, userData.name.first, "user should not have default field 'name.first'");
        test.equals(currentUser.name.last, userData.name.last,"user should not have default field 'name.last'");
        test.equals(currentUser.details, userData.details, "user should not have default field 'details'");

        test.done();
    },
    'TestDefaultModelFields': function(test){

        var userData = {username: 'tempuser', email: 'user@inbox.com'};
        var currentUser = new user(userData);

        test.equals(currentUser.balance, 0, "user should have default field 'balance' to be 0");
        test.equals(currentUser.active, true, "user should have default field 'active' to be true");
        test.ok(currentUser.created, "user should have default field 'created'");
        test.ok(!currentUser.name.first, "user should not have default field 'name.first'");
        test.ok(!currentUser.name.last, "user should not have default field 'name.last'");
        test.ok(!currentUser.details, "user should not have default field 'details'");

        test.done();
    }
};
