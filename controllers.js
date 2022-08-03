const {pool} = require('./db-config');

const {script} = require('./scripts');

//funciones crud

//seleccoinar los libros que tenemos en existencia
const getLibros = (req, res) => {
    console.log('funcion getLibros');
    pool.query(script.selectLibros, (error, results) => {
        if(error){
            throw error;
        }
        if(results.rows == ''){
            res.json({id:3, mensaje: "No hay libros para mostrar"})
        }
        else{

            res.json(results.rows);
        }
        
    })
}

//insertar un libro
const insertLibro = (req, res) => {
    console.log('funcion insertLibro');
    const {nombre_libro, 
        autor_libro, 
        editorial, 
        isbm, 
        codigo_barras, 
        cantidad, 
        id_categoria, 
        cant_disponibles, 
        fecha_publicacion, 
        fecha_creacion} = req.body;
    pool.query(script.inserLibro,[nombre_libro, 
        autor_libro, 
        editorial, 
        isbm, 
        codigo_barras, 
        cantidad, 
        id_categoria, 
        cant_disponibles, 
        fecha_publicacion, 
        fecha_creacion] ,(error, results) => {
        if(error){
            console.log(script.inserLibro);
            throw error;
        }
        
        res.json({id: 1, mensaje: "Libro insertado correctamente"});
        
    })
}

//update un libro
const updateLibro = (req, res) => {
    console.log('funcion updateLibro');
    const {nombre_libro, 
        autor_libro, 
        editorial, isbm, 
        codigo_barras, 
        cantidad, 
        id_categoria, 
        cant_disponibles, 
        fecha_publicacion, 
        id_libro} = req.body;
    pool.query(script.updateLibro,[nombre_libro, 
        autor_libro, 
        editorial, isbm, 
        codigo_barras, 
        cantidad, 
        id_categoria, 
        cant_disponibles, 
        fecha_publicacion, 
        id_libro] ,(error, results) => {
        if(error){
            throw error;
        }
        
        res.json({id: 1, mensaje: "Libro actualizado correctamente"});
        
    })
}

//borrar un libro
const deleteLibro = (req, res) => {
    console.log('funcion deleteLibro');
    const {id_libro} = req.body;
    pool.query(script.deleteLibro, [id_libro] ,(error, results) => {
        if(error){
            throw error;
        }
        
        res.json({id: 1 , mensaje: "Libro eliminado con exito"});
        
    })
}
//seleccionar todas las categorias que existen
const getCategorias = (req, res) => {
    console.log('funcion getCategorias');
    pool.query(script.selectCategorias, (error, results) => {
        if(error){
            throw error;
        }
        
        if(results.rows == ''){
            res.json({id:3 , mensaje: "No hay categorias para mostrar"})
        } else {

            res.json(results.rows);
        }
        
    })
}

module.exports = {
    getCategorias,
    getLibros,
    insertLibro,
    updateLibro,
    deleteLibro
}