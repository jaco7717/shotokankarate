const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

router
// GET Calender

    .get('/api/calender', async (request, response) => {
        response.json(await calenderModel.find().exec())
    })

    // POST Calender
    .post('/api/calender', (request, response) => {
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

    .get('/api/calender/:id', async (request, response) => {
        let id = request.params.id;
        response.json(await calenderModel.find({_id: id}).exec())
    })

    .delete('/api/calender/:id', async (request, response) => {
        let {id} = request.params;

        await calenderModel.find({_id: id}).deleteOne().exec();

        response.status(200).send("Message sent");
    });


module.exports = router;