const { response } = require('express');
const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;
const { querys } = require('./querys');




require('dotenv').config();

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect((error) => {
    if (error) throw error;
    console.log('Conexion a la base de datos establecida');
});

app.listen(port, () => {
    console.log('Aplicacion ejecutandose en el puerto: ' + port);
})

//prueba de la api
app.get('/', (req, res) => {
    // res.send('Hola mundo')
    res.json({id: 1, mensaje: "API corriendo correctamente"});
});



app.get('/libros', (request, response) => {
    connection.query(querys.selectLibros, (error, results) => {
        if (error) {
            throw error;
        }
        response.status(200).json(results);
    });
});

//insertar un libro
app.post('/insertLibro', (req, res) => {
    const { nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        cant_disponibles,
        fecha_publicaion,
        fecha_creacion } = req.body;

    try {
        connection.query(querys.inserLibro,
            [nombre_libro,
                autor_libro,
                editorial,
                isbm,
                codigo_barras,
                cantidad,
                id_categoria,
                cant_disponibles,
                fecha_publicaion,
                fecha_creacion],
            (error, resultado) => {
                if (error) {
                    throw error
                }
                res.json('Producto insertado');
            });

    }
    catch (error) {
        console.log('no funciono');
        res.status(500);
        res.send(error.message);
    }
})

//update a un libro
app.put('/updateLibro', (request, res) => {
    const {
        nombre_libro,
                autor_libro,
                editorial,
                isbm,
                codigo_barras,
                cantidad,
                id_categoria,
                cant_disponibles,
                fecha_publicaion,
                id_libro
    } = request.body;
    try{
        connection.query(querys.updateLibro, [
            nombre_libro,
                    autor_libro,
                    editorial,
                    isbm,
                    codigo_barras,
                    cantidad,
                    id_categoria,
                    cant_disponibles,
                    fecha_publicaion,
                    id_libro
        ], (error, resultado) =>{
            if(error)
            throw error
    
            res.status(200);
            res.json({codigo: "1", mensaje: "Libro actualizado correctamente"});
        });

    } catch(error){
        console.log('Error al hacer update al libro')
        res.send(error);
    }
});

//delete libro
app.delete('/deleteLibro', (req, res) => {
    const {id_libro} = req.body;
    try{

        connection.query(querys.deleteLibro, [id_libro], (err,response) =>{
            if(err)
            throw err

            res.json({id: 1, mesanje: "Libro eliminado correctamente"});
        })

    } catch(error){
        console.log('Error update libro');
        res.json({id: 0, mensaje: "No se pudo eliminar el libro"});
    }
})




module.exports = {
    connection
}

