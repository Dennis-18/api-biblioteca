const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
const port = 3000;

//archivo en donde estan las funciones que envian y reciben informacion de la base de datos
const db = require('./controllers');

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)
app.use(cors());
app.get('/', (req, res) => {
    res.json({id: 1, mensaje: "API corriendo correctamente"});
})

app.listen(port, () => {
    console.log(`App running in port ${port}`);
})


//rutas de la api
app.get('/getCategorias', db.getCategorias)

app.get('/getLibros', db.getLibros)

app.post('/insertLibro', db.insertLibro)

app.put('/updateLibro', db.updateLibro)

app.post('/deleteLibro', db.deleteLibro)

app.get('/getLibroNombre/:nombre_libro', db.selectNombreLibro)

app.post('/insertPrestamo', db.insertPrestamo)

app.post('/librosPrestados', db.selectLibrosPrestados)

app.get('/todosPrestados', db.prestamos)

app.put('/updateEstadoLibro', db.updateEstado)