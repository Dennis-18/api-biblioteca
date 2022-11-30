const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;


app.use(express.json({limit: "10mb", extended: true}))
app.use(express.urlencoded({limit: "10mb", extended: true, parameterLimit: 50000}))
//archivo en donde estan las funciones que envian y reciben informacion de la base de datos
const db = require('./controllers');
const cliente = require('./cliente.module/cliente.routes');
const etnias = require('./etnias.module/etnias.routes');
const comunidades = require('./comunidades.module/comunidades.routes');
const login = require('.//login.module/login.routes');
const grado_academico = require('./grado-academico.module/grado.routes');
const reportes = require('./reportes/routes');

// app.use(express.json({limit: '50mb'}));
// app.use(express.urlencoded({limit: '50mb'}));


// app.use(bodyParser.json())
// app.use(
//     bodyParser.urlencoded({

//         extended: true

//     })
// )
// app.use(express.json({limit: '25mb'}));
// app.use(express.urlencoded({limit: '25mb'}));

// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

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

app.get('/pendientes', db.prestadosPendientes)

app.get('/retornados', db.prestadosRetornados)

app.get('/categoriasPadre', db.categoriasPadre)

app.get('/librosCategoria/:id_categoria', db.libroCategoria)

app.get('/subsecciones/:id_categoria', db.subsecciones)

app.use(cliente);

app.use(etnias);

app.use(comunidades);

app.use(login);

app.use(grado_academico);

app.use(reportes);
