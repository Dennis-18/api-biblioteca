const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./comunidades.controller');

app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/comunidades', controller.comunidades)

module.exports = app;