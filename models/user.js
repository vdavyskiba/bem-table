var mongoose = require('../lib/mongoose');
var Schema = mongoose.Schema;

var schema = new Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        trim: true,
        unique: true
    },
    email: {
        type: String,
        lowercase: true,
        trim: true,
        required: true
    },
    created: {
        type: Date,
        default: Date.now
    },
    active: {
        type: Boolean,
        default: true
    },
    balance: {
        type: Number,
        default: 0
    },
    name: {
        first: String,
        last : String
    },
    details: {
        type: String
    }
});

exports.User = mongoose.model('User', schema);