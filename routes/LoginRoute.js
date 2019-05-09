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
    })
    // GET SESSION

    .get('/session', function (request, response) {
        const username = request.session.username;
        if (username) {
            response.render('session', {username});
        } else {
            response.render('login');
        }
    })

    // LOG OUT

    .get('/logout', function (request, response) {
        request.session.destroy(function (err) {
            if (err) {
                console.log(err);
            } else {
                response.redirect('/');
            }
        });
    })

    // LOG IN

    .post('/login', function (request, response) {
        const {username, password} = request.body;
        let login = request.body;
        loginModel.find(login).exec().then(logins => {
            console.log(login)
                if (logins.length === 1) {
                    request.session.username = username;
                    console.log('RIGTIGT!');
                    response.send({ok: true});
                } else {
                    console.log("FEJL");
                    response.send({ok: false});
                }
            }
        )
    });

module.exports = router;