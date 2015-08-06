var user = require('../models/user').User;
var ObjectID = require('mongodb').ObjectID;

module.exports = {

    store: function(data, callback) {
        user.create(data, callback);
    },
    remove: function(id, callback) {
        user.findByIdAndRemove(id, callback);
    },
    query: function(params, callback) {
        var count = params.count || 30;
        var page  = (params.page || 0) * count;
        user.find()
            .skip(page)
            .limit(count)
            .lean()
            .exec(callback);
    },
    restore: function(id, callback) {
        try {
            var objectId = new ObjectID(id);
        } catch (e) {
            return callback();
        }
        user.findById(objectId)
            .lean()
            .exec(callback);
    }
};
