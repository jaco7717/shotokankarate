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

    .post('/', async (request, response) => {
        let msgObj = request.body;
        controller.postNews(msgObj)
            .catch(error => response.status(400).send(error));
    })

    // DELETE /api/news

    .delete('/:id', async (request, response) => {
        let id = request.params.id;
        controller.deleteSingleNews(id)
            .catch(error => response.status(400).send(error));
    })

    // GET SINGLE NEWS

    .get('/:id', async (request, response) => {
        let id = request.params.id;
        controller.getSingleNews(id)
            .then (news => response.send(news))
            .catch(error => response.status(400).send(error));
    })

    // EDIT Single news

    .put('/:id', async function (request, response) {
        let id = request.params.id;
        let msgObj = request.body;
        controller.updateSingleNews(id, msgObj)
            .catch(error => response.status(400).send(error));



    });

module.exports = router;