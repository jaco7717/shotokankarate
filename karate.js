const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const express = require('express');
const app = express();
app.use(express.json());
const fetch = require('node-fetch');
const morgan = require('morgan');
const hbs = require('hbs');
const session = require('express-session');

mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://emillouvmand:wRcL2zAmJgRDLBnh@cluster0-vtzjz.mongodb.net/karate?retryWrites=true', {useNewUrlParser: true});

app.use(express.static('public'));

app.use(express.json());
app.use(morgan('tiny'));
app.use(express.static(__dirname + '/filer'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/templates');
app.use(session({secret: 'hemmelig', saveUninitialized: true, resave: true}));

console.log('SERVER STARTING!');
const loginSkema = new Schema({
    username: String,
    password: String
});

const loginModel = mongoose.model('login', loginSkema);

// GET /api/login

app.get('/api/login', async (request, response) => {
    response.json(await loginModel.find().exec())

});

// POST /api/login

app.post('/api/login', (request, response) => {
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

// GET api/news

const newsSkema = new Schema({
    headline: String,
    date: String,
    content: String
});

const newsModel = mongoose.model('news', newsSkema);

// GET
app.get('/api/news', async (request, response) => {
    response.json(await newsModel.find().exec())
});

// POST /api/news

app.post('/api/news', (request, response) => {
    let msgObj = request.body;
    let currentDate = (new Date().getDate() + "-" + (new Date().getMonth() + 1) + "-" + new Date().getFullYear());
    if (msgObj.headline) {
        let news = new newsModel({
            headline: msgObj.headline,
            date: currentDate,
            content: msgObj.content,
        });

        news.save();

        response.status(200).send("Message sent")

    }
});

// DELETE /api/news

app.delete('/api/news/:id', async (request, response) => {
    let {id} = request.params;

    await newsModel.find({_id: id}).deleteOne().exec();

    response.status(200).send("Message sent");
});

// GET SINGLE NEWS

app.get('/api/news/:id', async (request, response) => {
    let id = request.params.id;
    response.json(await newsModel.find({_id: id}).exec())
});


app.get('/session', function (request, response) {
    const username = request.session.username;
    if (username) {
        response.render('session', {username});
    } else {
        response.render('login');
    }
});

app.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            response.redirect('/');
        }
    });
});


app.post('/login', function (request, response) {
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
});


app.put('/api/news/:id', async function (request, response) {
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

const calenderSkema = new Schema({
    title: String,
    date: Date,
    content: String,
    className: String,
    allDay: Boolean,
});

const calenderModel = mongoose.model('calender', calenderSkema);

app.get('/api/calender', async (request, response) => {
    response.json(await calenderModel.find().exec())
});

app.post('/api/calender', (request, response) => {
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
});

app.get('/api/calender/:id', async (request, response) => {
    let id = request.params.id;
    response.json(await calenderModel.find({_id: id}).exec())
});

app.delete('/api/calender/:id', async (request, response) => {
    let {id} = request.params;

    await calenderModel.find({_id: id}).deleteOne().exec();

    response.status(200).send("Message sent");
});

// Medlemmer

const memberSkema = new Schema({
    name: String,
    age: String,
    email: String,
    password: String,
});

const memberModel = mongoose.model('member', memberSkema);

// GET member
app.get('/api/members', async (request, response) => {
    response.json(await memberModel.find().exec())
});

app.get('/api/members/:id', async (request, response) => {
    let id = request.params.id;
    response.json(await memberModel.find({_id: id}).exec())
});

// POST member
app.post('/api/members', (request, response) => {
    let memberObj = request.body;
    if (memberObj.name) {
        let member = new memberModel({
            name: memberObj.name,
            age: memberObj.age,
            email: memberObj.email,
            password: memberObj.password,
        });

        memberModel.find(memberObj.email).exec().then(array => {
           if (array.length ===1) {
               response.status(406).send("Error");
           } else {
               member.save()
               response.status(200).send("Message sent")
           }
        }

        )

    }
});

// DELETE member
app.delete('/api/members/:id', async (request, response) => {
    let {id} = request.params;

    await memberModel.find({_id: id}).deleteOne().exec();

    response.status(200).send("Message sent");
});

// PUT member
app.put('/api/members/:id', async function (request, response) {
    let {id} = request.params;
    let memberObj = request.body;
    if (memberObj.name) {
        let member = new newsModel({
            name: memberObj.name,
            age: memberObj.age,
            email: memberObj.email,
            password: memberObj.password,
        });

        await memberModel.findOneAndUpdate({_id: id}, memberObj);
        response.status(200).send("Member updated")

    }
});







let PORT = process.env.PORT || 8080;
module.exports = app;
app.listen(PORT);
