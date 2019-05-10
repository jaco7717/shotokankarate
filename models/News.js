const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const news = new Schema({
    headline: String,
    date: String,
    content: String

});

module.exports = mongoose.model('news', news);
