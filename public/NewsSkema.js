const mongoose = require('mongoose');

const newsSkema = new mongoose.Schema({
    headline: String,
    date: String,
    content: String

});

module.exports = mongoose.model('news', newsSkema);
