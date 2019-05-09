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
app.use(express.static('public'));
app.use(express.static(__dirname + '/filer'));
app.use(morgan('tiny'));
app.set('view engine', 'hbs');
app.set('views', __dirname + '/templates');
app.use(session({secret: 'hemmelig', saveUninitialized: true, resave: true}));


console.log('SERVER STARTING!');


const newsRouter = require('./routes/NewsRoute');
const loginRouter = require('./routes/LoginRoute');
const memberRouter = require('./routes/MemberRoute');
const calenderRouter = require('./routes/CalenderRoute');


app.use('/api/news', newsRouter);
app.use('/api/login', loginRouter);
app.use('/api/member', memberRouter);
app.use('/api/calender', calenderRouter);





let PORT = process.env.PORT || 8080;
module.exports = app;
app.listen(PORT);
