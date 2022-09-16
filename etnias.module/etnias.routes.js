const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./etnias.controller');

app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/etnias', controller.etnias);

module.exports = app;