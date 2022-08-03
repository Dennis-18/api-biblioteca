const script = {
    selectLibros: 'SELECT NOMBRE_LIBRO, AUTOR_LIBRO, EDITORIAL, DESCRIPCION AS CATEGORIA, ISBM, CODIGO_BARRAS, CANTIDAD FROM LIBRO AS LB JOIN CATEGORIAS AS CT ON LB.ID_CATEGORIA = CT.ID_CATEGORIA',
    inserLibro: 'INSERT INTO LIBRO (nombre_libro, autor_libro, editorial, isbm, codigo_barras, cantidad, id_categoria, cant_disponibles, fecha_publicacion, fecha_creacion) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10)',
    updateLibro: 'UPDATE LIBRO SET nombre_libro = $1, autor_libro = $2, editorial = $3, isbm = $4, codigo_barras = $5, cantidad = $6, id_categoria = $7, cant_disponibles = $8, fecha_publicacion = $9 WHERE id_libro = $10',
    deleteLibro: 'DELETE FROM LIBRO WHERE id_libro = $1',

    selectCategorias: 'SELECT * FROM CATEGORIAS'
}

module.exports = {
    script
}