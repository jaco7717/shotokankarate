const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();


const calenderModel = require('../models/Calender');

router
// GET Calender

    .get('/', async (request, response) => {
        controller.getAllEvents()
            .then(events => response.send(events))
            .catch(error => response.status(400).send(error));
    })

    // POST Calender
    .post('/', (request, response) => {
        let msgObj = request.body;
        controller.postEvent(msgObj)
            .catch(error => response.status(400).send(error));
    })

    // GET SINGLE Calender

    .get('/:id', async (request, response) => {
        let id = request.params.id;
        controller.getSingleEvent(id)
            .then(event => response.send(event))
            .catch(error => response.status(400).send(error));
    })

    // DELETE SINGLE EVENT

    .delete('/:id', async (request, response) => {
        let {id} = request.params;
        controller.deleteSingleEvent(id)
            .catch(error => response.status(400).send(error));
    })

    .put('/:id', async function (request, response) {
        let id = request.params.id;
        let msgObj = request.body;
        controller.updateSingleEvent(id, msgObj)
            .catch(error => response.status(400).send(error));

    });


module.exports = router;