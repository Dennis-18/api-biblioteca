const express = require('express');
const bodyParser = require('body-parser');
const controller = require('./controller');

app = express();

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

app.get('/genero_cantidad', controller.genero_cantidad)
app.get('/cantidad_visitas', controller.cantidad_visitas)
app.get('/cantidad_fecha', controller.cantidad_fecha)
app.get('/listado_genero/:genero',controller.listadoGenero)
app.get('/listado_fecha/:fecha', controller.listadoFecha)
app.get('/years', controller.years)
app.get('/visitasMes/:year', controller.visitasMes)
app.get('/visitasEtapaVida', controller.visitasEtapaVida)

app.get('/visitantesMes/:year/:month', controller.visitantesMes)
app.get('/visitantesEtapaVida/:etapa_vida', controller.visitantesEtapaVida)

module.exports = app;