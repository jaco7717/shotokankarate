const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const calenderSkema = new Schema({
    title: String,
    date: Date,
    content: String,
    className: String,
    allDay: Boolean,
    registered: String,
});

module.exports = mongoose.model('calender', calenderSkema);