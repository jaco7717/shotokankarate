const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const galleriModel = require('../models/Login');

router
// GET /api/Billeder

    .get('/', async (request, response) => {
        response.json(await galleriModel.find().exec())
    })

    // POST /api/Billeder

    .post('/', (request, response) => {
        let msgObj = request.body;

        if (msgObj.username) {
            let login = new loginModel({
                username: msgObj.username,
                password: msgObj.password,
            });


            login.save();

            response.status(200).send("Message sent")

        }
    });


module.exports = router;