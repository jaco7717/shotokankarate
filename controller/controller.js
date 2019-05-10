
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
}