const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const loginModel = require('../models/Login');

router
    // GET /api/login

    .get('/', async (request, response) => {
        response.json(await loginModel.find().exec())
    })

    // POST /api/login

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