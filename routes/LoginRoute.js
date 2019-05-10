const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const loginModel = require('../models/Login');

router
    // GET /api/login

    .get('/', async (request, response) => {
        controller.getLogins()
            .then (logins => response.send(logins))
            .catch(error => response.status(400).send(error));
    })

    // POST /api/login

    .post('/', (request, response) => {
        let msgObj = request.body;
        controller.postLogin(msgObj)
            .catch(error => response.status(400).send(error));
    });


module.exports = router;