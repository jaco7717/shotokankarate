const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const newsModel = require('../models/News');

router
// GET News
    .get('/', async (request, response) => {
       controller.getAllNews()
           .then (news => response.send(news))
            .catch(error => response.status(400).send(error));
    })

    // POST /api/news

    .post('/', (request, response) => {
        let msgObj = request.body;
        controller.postNews(msgObj)
            .catch(error => response.status(400).send(error));
    })

    // DELETE /api/news

    .delete('/:id', async (request, response) => {
        let {id} = request.params;

        await newsModel.find({_id: id}).deleteOne().exec();

        response.status(200).send("Message sent");
    })

    // GET SINGLE NEWS

    .get('/:id', async (request, response) => {
        let id = request.params.id;
        response.json(await newsModel.find({_id: id}).exec())
    })

    // EDIT Single news

    .put('/:id', async function (request, response) {
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