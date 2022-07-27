const express = require('express');
const app = express();
const mysql = require('mysql');
const port = 3000;


const {getLibros} = require('./controladores');

require('dotenv').config();

app.use(express.json());

const connection = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
});

connection.connect((error) =>{
    if(error) throw error;
    console.log('Conexion a la base de datos establecida');
});

app.listen(port, ()=>{
    console.log('Aplicacion ejecutandose en el puerto: ' + port);
})



app.get('/libros',(request, response) => {
    connection.query('SELECT * FROM LIBRO', (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results);
    });
});

app.get('/getLibros', getLibros);


// app.use(routes);


app.get('/', (req, res) =>{
    res.send('Hola mundo')
});


// app.use(routes);

// app.use(Routes);

module.exports = {
    connection}

