const mongoose = require('mongoose');

const news = new mongoose.Schema({
    headline: String,
    date: String,
    content: String

});

module.exports = mongoose.model('news', news);
