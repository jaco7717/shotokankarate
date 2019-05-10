const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const memberSkema = new Schema({
    name: String,
    age: String,
    email: String,
    password: String,
});

module.exports = mongoose.model('member', memberSkema);