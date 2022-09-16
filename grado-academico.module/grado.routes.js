const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./grado.controller');

app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/grados', controller.grados);

module.exports = app;