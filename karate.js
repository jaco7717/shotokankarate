const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ObjectId = Schema.Types.ObjectId;
const express = require('express');
const app = express();
app.use(express.json());
const fetch = require('node-fetch');


mongoose.Promise = Promise;
mongoose.connect('mongodb+srv://emillouvmand:wRcL2zAmJgRDLBnh@cluster0-vtzjz.mongodb.net/karate?retryWrites=true', {useNewUrlParser: true});

app.use(express.static('public'));

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

const newsSkema = new Schema( {
    headline: String,
    date: { type: Date, default: Date.now },
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

    if (msgObj.headline) {
        let news = new loginModel({
            headline: msgObj.headline,
            data: msgObj.date,
            content: msgObj.content,

        });

        news.save();

        response.status(200).send("Message sent")

    }
});




let PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log("starter");

console.log('hej');