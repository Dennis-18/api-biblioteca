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
app.get('/etapas_vida', controller.etapas_vida)
app.get('/nacionalidades', controller.nacionalidades)

module.exports = app;

