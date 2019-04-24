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


let PORT = process.env.PORT || 8080;
app.listen(PORT);
console.log("starter");

console.log('hej');