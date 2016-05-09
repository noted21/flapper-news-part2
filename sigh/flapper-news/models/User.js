var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    id: String,
    access_token: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    email: String,
    access_token: String
});
