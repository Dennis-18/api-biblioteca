const { pool } = require('./db-config');

const { script } = require('./scripts');

const { sendMail, enviarMail } = require('./mailService');

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
            throw error;
        }
        if (results.rows == '') {
            res.json({ id: 3, mensaje: "No hay libros para mostrar" })
        }
        else {

            res.json(results.rows);
        }

    })
}

//insertar un libro
const insertLibro = (req, res) => {
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
        fecha_creacion } = req.body;
    pool.query(script.inserLibro, [nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        cant_disponibles,
        fecha_publicacion,
        fecha_creacion], (error, results) => {
            if (error) {
                console.log(script.inserLibro);
                throw error;
            }

            res.json({ id: 1, mensaje: "Libro insertado correctamente" });

        })
}

//update un libro
const updateLibro = (req, res) => {

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
        id_libro } = req.body;
    console.log(nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        fecha_publicacion,
        id_libro);
    pool.query(script.updateLibro, [
        nombre_libro,
        autor_libro,
        editorial,
        isbm,
        codigo_barras,
        cantidad,
        id_categoria,
        fecha_publicacion,
        id_libro], (error, results) => {
            if (error) {
                throw error;
            }

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
            throw error;
        }

        res.json({ id: 1, mensaje: "Libro eliminado con exito" });

    })
}
//seleccionar todas las categorias que existen
const getCategorias = (req, res) => {
    console.log('funcion getCategorias');
    pool.query(script.selectCategorias, (error, results) => {
        if (error) {
            throw error;
        }

        if (results.rows == '') {
            res.json({ id: 3, mensaje: "No hay categorias para mostrar" })
        } else {

            res.json(results.rows);
        }

    })
}

const selectNombreLibro = (req, res) => {
    const { nombre_libro } = req.params;
    // console.log(nombre_libro);
    pool.query(script.selectNombreLibro, ['%' + nombre_libro.toLowerCase() + '%'], (error, results) => {
        if (error) {
            throw error;
        }
        // console.log(results.rows);
        res.status(200).json(results.rows);
    })
};

const insertPrestamo = async (req, res) => {

    const { cliente, libros } = req.body;

    // console.log(cliente);
    // console.log(libros);

    try {
        await pool.query(script.insertPrestamo, [
            cliente.nombre,
            cliente.apellido,
            cliente.telefono,
            cliente.correo,
            cliente.direccion,
            cliente.edad,
            cliente.genero,
            cliente.grado,
            cliente.estudiante], (error, results) => {
                if (error) {
                    throw error;
                }
                // console.log(results.rows);
                let { id_prestamo } = results.rows[0];
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
                            throw err;
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
            throw error;
        }

        //  console.log(results.rows);
        res.status(200).json(results.rows);

    })
};

const prestamos = (req, res) => {
    console.log('todos los libros prestados');
    pool.query(script.todosPrestados, (error, results) =>{
        if(results.rowCount > 0){
            res.json({id: 1, data: results.rows})
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
    updateEstado
}