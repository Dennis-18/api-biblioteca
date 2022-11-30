const { pool } = require('./db-config');

const { script } = require('./scripts');

const { sendMail, enviarMail } = require('./mailService');
const { query } = require('express');

//variable fecha
let fecha_actual = new Date();
let year = fecha_actual.getFullYear();
let codigo_prestamo;
let id_prestamoRetornado;

//funciones crud

//seleccoinar los libros que tenemos en existencia
const getLibros = (req, res) => {
    console.log('funcion getLibros');
    pool.query(script.selectLibros, (error, results) => {
        if (error) {
            // throw error;
            res.json({id:0, mensaje: error});
        }
        if (results.rows == '') {
            res.json({ id: 3, mensaje: "No hay libros para mostrar" })
        }
        else {

            res.json(results.rows);
        }

    })
}

//insertar imagen en una tabla
const guardarImagen =  (nombre_imagen,imagen) => {
    return new Promise((resolve, reject) =>{
        try{
            pool.query(script.insertImagen,[nombre_imagen, imagen], (error, results) =>{
                if(error){
                    console.log('reject 1');
                    reject();
                }
                if(results.rowCount > 0){
                    console.log('resuelve');
                    resolve(results.rows[0]);
                }
            })
        } catch(error){
            console.log('catch ' + error);
        }
    })
}


//insertar un libro
const insertLibro = async (req, res) => {
    console.log('funcion insertLibro');
    const { nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        cant_disponibles,
        fecha_publicacion,
        fecha_creacion,
        tomo_inicial,
        tomo_final,
        parte,
        estado,
        tipo_autor,
        nombre_imagen,
    codigo_interno, imagen} = req.body;

        let {id_imagen} = await guardarImagen(nombre_imagen,imagen);
        console.log(nombre_imagen);
        console.log(id_imagen);
    pool.query(script.inserLibro, [nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        cant_disponibles,
        fecha_publicacion,
        fecha_creacion,
        tomo_inicial,
        tomo_final,
        parte,
        estado,
        tipo_autor,
        id_imagen,
        codigo_interno], (error, results) => {
            if (error) {
                console.log(script.inserLibro);
                // throw error;
                res.json({id:0, mensaje:error});
            }

            res.json({ id: 1, mensaje: "Libro insertado correctamente" });

        })
}

//actualizar la imagen de un libro
const update_imagen = async (id_libro, imagen) => {
    return new Promise((resolve, reject) =>{

        try{

            pool.query(script.update_imagen, [imagen, id_libro], (error, results) =>{
                if(error){
                    reject("0");
                } else{
                    resolve("1");
                }
            })
        } catch(error){

        }
    })
}

//update un libro
const updateLibro = async (req, res) => {

    console.log('funcion updateLibro');
    const {
        nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        fecha_publicacion,
        id_libro, imagen, tipo_autor,
        tomo_inicial,
        tomo_final,
        parte,
        estado,
        codigo_interno} = req.body;
    // console.log(nombre_libro,
    //     autor_libro,
    //     editorial,
    //     isbm,
    //     codigo_barras,
    //     cantidad,
    //     id_categoria,
    //     fecha_publicacion,
    //     id_libro);

    // console.log('llega aqui');
    
    let respuesta = await update_imagen(id_libro, imagen);
    if(respuesta == "0"){
        //insertar imagen
        console.log(respuesta);
        res.json({id:3, mensaje: 'No se pudo actualizar la imagen'});
    } 


    // console.log('actualizo la imagen');

    // console.log(        nombre_libro,
    //     autor_libro,
    //     editorial,
    //     isbm,
    //     codigo_barras,
    //     cantidad,
    //     id_categoria,
    //     fecha_publicacion,
    //     id_libro, tipo_autor,
    //     tomo_inicial,
    //     tomo_final,
    //     parte,
    //     estado,
    //     codigo_interno)
    pool.query(script.updateLibro, [
        nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        fecha_publicacion,
        id_libro, tipo_autor, tomo_inicial, tomo_final, parte,
        estado, codigo_interno, respuesta], (error, results) => {
            if (error) {
                // throw error;
                res.json({id:0, mensaje: error});
            }
            console.log('todo bien ');
            res.json({ id: 1, mensaje: "Libro actualizado correctamente" });

        })
}

//borrar un libro
const deleteLibro = (req, res) => {
    console.log('funcion deleteLibro');
    // console.log(req);
    const { id_libro } = req.body;
    // console.log(id_libro);
    pool.query(script.deleteLibro, [id_libro], (error, results) => {
        if (error) {
            console.log('error delete libro');
            // throw error;
            res.json({id:0, mensaje: error});
        }

        res.json({ id: 1, mensaje: "Libro eliminado con exito" });

    })
}
//seleccionar todas las categorias que existen
const getCategorias = (req, res) => {
    console.log('funcion getCategorias');
    pool.query(script.selectCategorias, (error, results) => {
        if (error) {
            // throw error;
            res.json({id:0, mensaje: error});
        }

        if (results.rows == '') {
            res.json({ id: 3, mensaje: "No hay categorias para mostrar" })
        } else {

            res.json(results.rows);
        }

    })
}

const subsecciones = (req, res) => {
    const {id_categoria} = req.params;

    try{
        pool.query(script.subsecciones, [id_categoria], (error, results) => {
            if(error){
                console.log(`Error query subsecciones: ${error}`);
                res.json({id:0, mensaje: `Error query subsecciones: ${error}`});
            }

            if(results && results.rowCount > 0) {
                res.json({id: 1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(`Error catch subsecciones: ${error}`);
        res.json({id:0, mensaje:`Error catch subsecciones: ${error}`})
    }
}

const selectNombreLibro = (req, res) => {
    const { nombre_libro } = req.params;
    console.log(nombre_libro);
    pool.query(script.selectNombreLibro, ['%' + nombre_libro.toLowerCase() + '%'], (error, results) => {
        if (error) {
            // throw error;
            console.log('error select nombre libro: ' + error);
            res.json({id:0, mensaje: error});
        }
        // console.log(results.rows);
        if(results){
            console.log('existe results');
            // console.table(results.rows);
            if(results.rowCount > 0){
                console.log('results es mayor a 0');
                res.status(200).json({id:1, mensaje:results.rows});
            } else{
                console.log('results es menor a 0');
                res.json({id:2, mensaje: 'No hay registrto'});
            }
        } else{
            console.log('no existe results');
            res.json({id:2, mensaje: 'no hay registros'});
        }
    })
};

const insertPrestamo = async (req, res) => {

    // console.log(req.body);

    const { cliente, libros } = req.body;

    // console.log(cliente);
    // console.log(libros);

    try {
        // console.log(cliente);
         pool.query(script.insertPrestamo, [
            cliente.nombre,
            cliente.apellido,
            cliente.telefono,
            cliente.correo,
            cliente.direccion,
            cliente.edad,
            cliente.genero,
            cliente.grado,
            cliente.estudiante],async (error, results) => {
                if (error) {
                    console.log('error insert prestamo')
                    // throw error;
                    res.json({id:0, mensaje:error});
                }
                // console.log(results.rows);
                let { id_prestamo } = await results.rows[0];
                id_prestamoRetornado = id_prestamo;
                // console.log(id_prestamo);
                codigo_prestamo = year + '-' + id_prestamoRetornado;
                //insertar libros
                for (let libro of libros) {

                    pool.query(script.insertLibrosPrestados, [
                        libro.id_libro,
                        id_prestamo,
                        libro.fecha_prestamo,
                        libro.fecha_devolucion,
                        libro.estado,
                        codigo_prestamo
                    ], (err, result) => {
                        if (err) {
                            console.log('error2 '+ err);
                            // throw err;
                            res.json({id:0, mensaje: err});
                        }
                        // console.log('exito');
                    })
                }


                
                // console.log(codigo_prestamo);
                let mailOptions = {
                    from: 'rabinalbilbioteca@gmail.com',
                    to: cliente.correo,
                    subject: 'Informacion sobre Prestamo de Libros',
                    text: 'Este es el codigo para el prestamo de tu libro: ' + codigo_prestamo
                };
                // console.log('mail cliente: ' + cliente.correo);
                // let mail = enviarMail(mailOptions);
                // console.log('respuesta mail: ' + mail);
                res.json({ id: 1, mensaje: "Proceso exitoso", codigo: codigo_prestamo });
                codigo_prestamo = '';

            })

    } catch (err) {
        console.log(err);
    }
}

const selectLibrosPrestados = async (req, res) =>{
    console.log('select libros prestados');
    const {codigo_prestamo} = req.body;
    // console.log(codigo_prestamo);
    await pool.query(script.selectLibrosPrestados,['%' + codigo_prestamo + '%'], (error, results) =>{
        if(error){
            // throw error;
            res.json({id:0, mensaje: error});
        }

        //  console.log(results.rows);
        res.status(200).json(results.rows);

    })
};

const prestamos = (req, res) => {
    console.log('todos los libros prestados');
    pool.query(script.todosPrestados, (error, results) =>{
        if(results.rowCount > 0){
            res.json({id: 1, mensaje: results.rows})
        }
        if(error){
            res.json({id:0, mensaje: error})
        }
    })
}

const updateEstado = (req, res) => {
    const {id_libro, codigo_prestamo, fecha_devolucion, condiciones} = req.body;
    pool.query(script.update_estado_libro,[condiciones, fecha_devolucion, id_libro, codigo_prestamo], (error, results) => {
        if(error){
            res.json({id: 0, mensaje: 'Error al actualizar el registro'});
        }
        res.json({id:1, mensaje: 'Actualizacion exitosa'});
    })
}

const prestadosPendientes = (req, res) => {
    pool.query(script.prestadosPendientes, (error, results) => {
        if(error){
            res.json({id: 0, mensaje: 'Error al obtener los datos'});
        }

        if(results.rowCount > 0){
            res.json({id: 1, mensaje: results.rows});
        } else{
            res.json({id: 2, mensaje: 'No hay registros'})
        }
    })
}

const prestadosRetornados = (req, res) => {
    pool.query(script.prestadosRetornados, (error, results) => {
        if(error){
            res.json({id: 0, mensaje: 'Error al obtener los datos'});
        }

        if(results.rowCount > 0){
            res.json({id: 1, mensaje: results.rows});
        } else{
            res.json({id: 2, mensaje: 'No hay registros'});
        }
    })
}

categoriasPadre = (req, res) => {
    console.log('categoriasPadre')
    try{
        pool.query(script.categoriasPadre, (error,results) => {
            if(error){
                console.log(`Error query categoriasPadre: ${error}`);
                res.json({id:0, mensaje:`Error query categoriasPadre: ${error}`});
            }

            if(results && results.rowCount > 0){
                res.json({id: 1, mensaje: results.rows});
            }
        })

    } catch(error) {
        console.log(`Error catch categoriasPadre: ${error}`);
        res.json({id:0, mensaje: `Error catch categoriasPadre: ${error}`})
    }
}

libroCategoria = (req, res) => {
    console.log('libroCategoria');
    const {id_categoria} = req.params;
    try{
        pool.query(script.libroCategoria, [id_categoria], (error, results) => {
            if(error){
                console.log(`Error en query libroCategoria: ${error}`);
                res.json({id:0, mensaje: `Error en query libroCategoria: ${error}`});
            }

            if(results && results.rowCount > 0){
                res.json({id:1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(error);
        res.json({id:0, mensaje: `Error catch libroCategoria: ${error}`});
    }
}
module.exports = {
    getCategorias,
    getLibros,
    insertLibro,
    updateLibro,
    deleteLibro,
    selectNombreLibro,
    insertPrestamo,
    selectLibrosPrestados,
    prestamos,
    updateEstado,
    prestadosPendientes,
    prestadosRetornados,
    categoriasPadre,
    libroCategoria,
    subsecciones
}