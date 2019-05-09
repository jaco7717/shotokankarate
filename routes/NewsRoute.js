const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const news = require('../models/News');

router
// GET News
    .get('/api/news', async (request, response) => {
        response.json(await news.find().exec())
    })

    // POST /api/news

    .post('/api/news', (request, response) => {
        let msgObj = request.body;
        let currentDate = (new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear());
        if (msgObj.headline) {
            let news = new newsModel({
                headline: msgObj.headline,
                date: currentDate,
                content: msgObj.content,
            });

            news.save();

            response.status(200).send("Message sent")

        }
    })

    // DELETE /api/news

    .delete('/api/news/:id', async (request, response) => {
        let {id} = request.params;

        await newsModel.find({_id: id}).deleteOne().exec();

        response.status(200).send("Message sent");
    })

    // GET SINGLE NEWS

    .get('/api/news/:id', async (request, response) => {
        let id = request.params.id;
        response.json(await newsModel.find({_id: id}).exec())
    })

    // EDIT Single news

    .put('/api/news/:id', async function (request, response) {
        let {id} = request.params;
        let msgObj = request.body;
        if (msgObj.headline) {
            let news = new newsModel({
                headline: msgObj.headline,
                content: msgObj.content,
            });

            await newsModel.findOneAndUpdate({_id: id}, msgObj)
            response.status(200).send("Message updated")

        }
    });

module.exports = router;