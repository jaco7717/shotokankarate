"use strict"

const newsModel = require('../models/News')
const calenderModel = require('../models/Calender')
const loginModel = require('../models/Login')
const memberModel = require('../models/Member')


// NEWS

exports.getAllNews = function () {
    return newsModel.find().exec();
};

exports.postNews = async function (msgObj) {
    let currentDate = (new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear());
    if (msgObj.headline) {
        let news = new newsModel({
            headline: msgObj.headline,
            date: currentDate,
            content: msgObj.content,
        });
        return news.save()
    } else {
        throw new Error("Could not post");
    }
};

exports.getSingleNews = async function (id) {
    return newsModel.find({_id: id}).exec();
};

exports.deleteSingleNews = async function (id) {
    const array = await newsModel.find({_id: id});
    if (array[0]._id == id) {
        return newsModel.find({_id: id}).deleteOne()
    } else {
        throw new Error("Could not delete");
    }
}
;
exports.updateSingleNews = async function (id, msgObj) {
    const array = await newsModel(find({_id: id}));
    if (array[0]._id == id) {
        return newsModel.findOneAndUpdate({_id: id}, msgObj)
    } else {
        throw new Error("Could not update");
    }

};

// --------------------------------------------------------------------------------------------------------------

// Calender

exports.getAllEvents = function () {
    return calenderModel.find().exec();
};

exports.postEvent = function (msgObj) {

    if (msgObj.title) {
        let event = new calenderModel({
            title: msgObj.title,
            date: msgObj.date,
            content: msgObj.content,
            className: 'info',
            allDay: false,
        });
        return event.save();
    }
};

exports.getSingleEvent = function (id) {
    return calenderModel.find({_id: id}).exec()
};

exports.deleteSingleEvent = function (id) {
    return calenderModel.find({_id: id}).deleteOne().exec();
};

exports.updateSingleEvent = function (id, msgObj) {
    return calenderModel.findOneAndUpdate({_id: id}, msgObj)
};

// --------------------------------------------------------------------------------------------------------------

// Login

exports.getLogins = function () {
    return loginModel.find().exec();
};

exports.postLogin = function (msgObj) {
    if (msgObj.username) {
        let login = new loginModel({
            username: msgObj.username,
            password: msgObj.password,
        });
        login.save();
    }
};

// --------------------------------------------------------------------------------------------------------------

// Member

exports.getMembers = function () {
    return memberModel.find().exec();
};

exports.getSingleMember = function (id) {
    return memberModel.find({_id: id}).exec();
};

exports.postMember = async function (memberObj) {
    let found = false;
    if (memberObj.name) {
        let member = new memberModel({
            name: memberObj.name,
            age: memberObj.age,
            email: memberObj.email,
            password: memberObj.password,
        });

        const array = await memberModel.find().exec();

        for (let i of array) {
            if (i.email === memberObj.email) {
                found = true;
            }
        }
        if (found === false) {
            return member.save();
        } else {
            throw new Error("Not Found")
        }
    } else {
        throw new Error("Need all information")
    }
}

exports.deleteMember = async function (id) {
    const array = await memberModel.find({_id: id});
    if (array[0]._id == id) {
        return memberModel.find({_id: id}).deleteOne();
    } else {
        throw new Error("Could not delete")
    }
};

exports.updateMember = function (id, memberObj) {
    const array = await memberModel.find({_id: id});
    if (array[0]._id = id) {
        return memberModel.findOneAndUpdate({_id: id}, memberObj);
    } else {
        throw new Error("Could not update");
    }
};