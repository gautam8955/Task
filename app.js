const express = require('express')
const path = require('path')
const ejs = require('ejs')
const bodyParser = require('body-parser')
const emp = require('./routes/empData')
const mongoose = require('mongoose')

const app = express()

//connecting to mongodb using connection string.
mongoose.connect('mongodb://localhost:27017/task', {useNewUrlParser: true, useUnifiedTopology: true})


//setting view path.
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');	

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use(express.static(__dirname + '/views'));

app.use(express.static(__dirname + '/public'));


//accessing router
app.use(emp)

module.exports = app