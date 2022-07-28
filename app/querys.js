 const querys = {
    selectLibros: 'SELECT * FROM LIBRO',
    inserLibro: 'INSERT INTO LIBRO (nombre_libro, autor_libro, editorial, isbm, codigo_barras, cantidad, id_categoria, cant_disponibles, fecha_publicaion, fecha_creacion) VALUES( ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    updateLibro: 'UPDATE LIBRO SET nombre_libro = ?, autor_libro = ?, editorial = ?, isbm = ?, codigo_barras = ?, cantidad = ?, id_categoria = ?, cant_disponibles = ?, fecha_publicaion = ? WHERE id_libro = ?',
    deleteLibro: 'DELETE FROM LIBRO WHERE id_libro = ?',

    getCategoriasF: 'SELECT * FROM CATEGORIAS',
}

module.exports = {
querys
}