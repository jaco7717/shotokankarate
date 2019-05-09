const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();


const calenderModel = require('../models/Calender');

router
// GET Calender

    .get('/', async (request, response) => {
        controller.getAllNews();
    })

    // POST Calender
    .post('/', (request, response) => {
        let msgObj = request.body;

        if (msgObj.title) {
            let event = new calenderModel({
                title: msgObj.title,
                date: msgObj.date,
                content: msgObj.content,
                className: 'info',
                allDay: false,
            });

            event.save();

            response.status(200).send("Message sent")
        }
    })

    // GET SINGLE Calender

    .get('/:id', async (request, response) => {
        let id = request.params.id;
        response.json(await calenderModel.find({_id: id}).exec())
    })

    .delete('/:id', async (request, response) => {
        let {id} = request.params;

        await calenderModel.find({_id: id}).deleteOne().exec();

        response.status(200).send("Message sent");
    });


module.exports = router;