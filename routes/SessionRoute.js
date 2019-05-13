const controller = require("../controller/controller");
const express = require('express');
const router = express.Router();

const loginModel = require('../models/Login');
const memberModel = require('../models/Member');

router
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
                if (logins.length === 1) {
                    request.session.username = username;
                    response.send({ok: true});
                } else {
                    response.send({ok: false});
                }
            }
        )
    })

    .post('/member', function (request, response) {
        const {email, password} = request.body;
        let login = request.body;
        

        memberModel.find(login).exec().then(member => {
                if (member.length === 1) {
                    request.session.email = email;
                    request.session.password = password;
                    request.session._id = member[0]._id;
                    console.log(member);
                    console.log(member[0].email);
                    console.log(member[0]._id);

                    response.send({ok: true});
                } else {
                    response.send({ok: false});
                }
            }
        )
    })

    .get('/memberSession', function (request, response) {
        const email = request.session.email;
        const password = request.session.password;
        const name = request.session.name;
        const age = request.session.age;
        const id = request.session.id;


        if (email) {
            response.render('memberSession', {id, name, age, password, email});
        } else {
            response.render('login');
        }
    })

module.exports = router;