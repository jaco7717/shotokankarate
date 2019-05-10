
"use strict"

const newsModel = require('../models/News')
const calenderModel = require('../models/Calender')
const loginModel = require('../models/Login')
const memberModel = require('../models/Member')


// NEWS

exports.getAllNews = function() {
    return newsModel.find().exec();
}

exports.postNews = function(msgObj) {
    let currentDate = (new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear());
    if (msgObj.headline) {
        let news = new newsModel({
            headline: msgObj.headline,
            date: currentDate,
            content: msgObj.content,
        });
       return news.save();
    }
};

exports.getSingleNews = function(id) {
    return newsModel.find({_id: id}).exec()
};

exports.deleteSingleNews = function(id) {
    return newsModel.find({_id: id}).deleteOne().exec();
}
;
exports.updateSingleNews = function(id,msgObj) {
    if (msgObj.headline && msgObj.content) {
        return newsModel.findOneAndUpdate({_id: id}, msgObj)
        }
};