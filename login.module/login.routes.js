const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./login.controller');

app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post('/auth', controller.auth);

module.exports = app;