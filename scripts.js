const primero = 'select l.id_libro, l.nombre_libro, l.autor_libro, l.editorial, l.isbm, l.codigo_barras, l.cantidad,l.id_categoria , c.descripcion as categoria, l.fecha_publicacion, l.tomo_inicial, l.tomo_final, l.parte, ta.descripcion as tipo_autor, img.imagen, l.codigo_interno ';
const segundo = 'from libro as l left join categorias as c on c.id_categoria = l.id_categoria left join tipos_autor as ta on ta.id_tipo_autor = l.tipo_autor left join imagen_libro as img ';
const tercero = 'on img.id_imagen = l.id_imagen order by l.fecha_creacion desc offset 0 fetch next 10 rows only;';

const script = {
    selectLibros: primero + segundo + tercero ,
    inserLibro: 'INSERT INTO LIBRO (nombre_libro, autor_libro, editorial, isbm, codigo_barras, cantidad, id_categoria, cant_disponibles, fecha_publicacion, fecha_creacion,tomo_inicial, tomo_final, parte, estado, tipo_autor, id_imagen, codigo_interno) VALUES( $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,$11,$12,$13,$14,$15,$16,$17)',
    updateLibro: 'UPDATE LIBRO SET nombre_libro = $1, autor_libro = $2, editorial = $3, isbm = $4, codigo_barras = $5, cantidad = $6, id_categoria = $7, fecha_publicacion = $8 WHERE id_libro = $9',
    deleteLibro: 'delete from LIBRO where ID_LIBRO = $1',
    selectNombreLibro: 'SELECT LB.ID_LIBRO, LB.NOMBRE_LIBRO, LB.AUTOR_LIBRO, LB.EDITORIAL , LB.ID_CATEGORIA , CT.DESCRIPCION AS CATEGORIA, LB.ISBM, LB.CODIGO_BARRAS, LB.CANTIDAD, LB.FECHA_PUBLICACION, img.imagen FROM LIBRO AS LB JOIN CATEGORIAS AS CT ON LB.ID_CATEGORIA = CT.ID_CATEGORIA JOIN imagen_libro as img on LB.id_imagen = img.id_imagen WHERE LB.NOMBRE_LIBRO LIKE $1',
    

    insertPrestamo: 'INSERT INTO PRESTAMOS (nombre_cliente, apellido_cliente, telefono_cliente, correo_cliente, direccion_cliente, edad_cliente, genero_cliente, grado_academico, estudiante, estado_prestamo, id_usuario) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, 1, 1) returning id_prestamo',
    insertLibrosPrestados: 'INSERT INTO LIBROS_PRESTADOS (id_libro, id_prestamo, fecha_prestamo, fecha_estimada_retorno, condiciones_libro, id_estado, codigo_prestamo) VALUES($1, $2, $3, $4, $5, 1, $6)',
    selectLibrosPrestados: 'select LP.codigo_prestamo ,LB.ID_LIBRO, LB.NOMBRE_LIBRO, (P.NOMBRE_CLIENTE || \' \' || P.APELLIDO_CLIENTE) as CLIENTE, LP.ID_ESTADO, LP.condiciones_devolucion, LP.FECHA_DEVOLUCION, LP.FECHA_PRESTAMO from libro as LB join libros_prestados as LP on LB.id_libro = LP.id_libro join prestamos as P on P.id_prestamo = LP.id_prestamo where LP.codigo_prestamo like $1 or lower(P.nombre_cliente)  like $1 or lower(P.apellido_cliente) like $1',
    todosPrestados: 'select LP.codigo_prestamo ,LB.ID_LIBRO, LB.NOMBRE_LIBRO, (P.NOMBRE_CLIENTE || \' \' || P.APELLIDO_CLIENTE) as CLIENTE, LP.ID_ESTADO, LP.condiciones_devolucion, LP.FECHA_DEVOLUCION, LP.FECHA_PRESTAMO from libro as LB join libros_prestados as LP on LB.id_libro = LP.id_libro join prestamos as P on P.id_prestamo = LP.id_prestamo order by LP.fecha_prestamo DESC',
    prestadosPendientes: 'select LP.codigo_prestamo ,LB.ID_LIBRO, LB.NOMBRE_LIBRO, (P.NOMBRE_CLIENTE || \' \' || P.APELLIDO_CLIENTE) as CLIENTE, LP.ID_ESTADO, LP.condiciones_devolucion, LP.FECHA_DEVOLUCION, LP.FECHA_PRESTAMO from libro as LB join libros_prestados as LP on LB.id_libro = LP.id_libro join prestamos as P on P.id_prestamo = LP.id_prestamo where lp.id_estado = 1 order by LP.fecha_prestamo DESC',
    prestadosRetornados: 'select LP.codigo_prestamo ,LB.ID_LIBRO, LB.NOMBRE_LIBRO, (P.NOMBRE_CLIENTE || \' \' || P.APELLIDO_CLIENTE) as CLIENTE, LP.ID_ESTADO, LP.condiciones_devolucion, LP.FECHA_DEVOLUCION, LP.FECHA_PRESTAMO from libro as LB join libros_prestados as LP on LB.id_libro = LP.id_libro join prestamos as P on P.id_prestamo = LP.id_prestamo where lp.id_estado = 2 order by LP.fecha_prestamo DESC',
    selectCategorias: 'SELECT * FROM CATEGORIAS',
    update_estado_libro: 'update libros_prestados set id_estado = 2, condiciones_devolucion = $1, fecha_devolucion = $2 where id_libro = $3 and codigo_prestamo = $4',
    insertImagen:'insert into imagen_libro(nombre_imagen, imagen) values($1,$2) returning id_imagen'
}

module.exports = {
    script
}

//    selectLibros: 'SELECT LB.ID_LIBRO, LB.NOMBRE_LIBRO, LB.AUTOR_LIBRO, LB.EDITORIAL , LB.ID_CATEGORIA , CT.DESCRIPCION AS CATEGORIA, LB.ISBM, LB.CODIGO_BARRAS, LB.CANTIDAD, LB.FECHA_PUBLICACION FROM LIBRO AS LB JOIN CATEGORIAS AS CT ON LB.ID_CATEGORIA = CT.ID_CATEGORIA',