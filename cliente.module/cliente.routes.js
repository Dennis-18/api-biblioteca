const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./cliente.controller');

app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.post('/cliente', controller.nuevoCliente)
app.post('/getCliente', controller.getCliente);

module.exports = app;

