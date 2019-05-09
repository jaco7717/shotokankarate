
"use strict"

const newsModel = require('../models/News')
const calenderModel = require('../models/Calender')
const loginModel = require('../models/Login')
const memberModel = require('../models/Member')

async function getAllNews(response) {
    return response.json(await calenderModel.find().exec())
}

exports.getAllNews = function(response) {
    return response.json(calenderModel.find().exec());
}