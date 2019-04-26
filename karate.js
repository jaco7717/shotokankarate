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
app.use(express.static(__dirname+'/filer'));
app.set('view engine', 'hbs');
app.set('views', __dirname+'/templates');
app.use(session({secret: 'hemmelig', saveUninitialized: true, resave: true}));

console.log('test');
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
        let news = new newsModel({
            headline: msgObj.headline,
            date : msgObj.date,
            content: msgObj.content,

        });

        news.save();

        response.status(200).send("Message sent")

    }
});

// DELETE /api/news

app.delete('/api/news/:id', (request, response) => {

    console.log(request.body.id);
    console.log(request.params.id);
        .then(resultat => resultat.json())
        .then(resultat => {
            for (let i of resultat) {

        if (request.body.id === i.id) {
            let index = array.indexOf(i);
            array.splice(index, i);

        }

    }
    }
)
});


app.get('/session', function (request, response) {
    const username = request.session.username;
    if (username) {
        response.render('session', {username});
    }
    else {
        response.render('login');
    }
});

app.get('/logout', function (request, response) {
    request.session.destroy(function (err) {
        if (err) {
            console.log(err);
        }
        else {
            response.redirect('/');
        }
    });
});

app.post('/login', function (request, response) {
    const {username, password} = request.body;
    let login = request.body;
    console.log(login);
    loginModel.find(login).exec().then(logins => {
            console.log(logins);
            if(logins.length === 1){
                request.session.username = username;
                response.send({ok: true});
            }
            else{
                response.send({ok: false});
            }
        }
    )
});

let PORT = process.env.PORT || 8080;
module.exports = app;
app.listen(PORT);
