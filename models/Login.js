const mongoose = require('mongoose');

const loginSkema = new Schema({
    username: String,
    password: String
});

module.exports = mongoose.model('login', loginSkema);