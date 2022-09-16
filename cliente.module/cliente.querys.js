const clienteQuerys = {
    query_nuevo_cliente: 'insert into clientes (nombre, apellido, direccion, telefono, correo, edad, genero, grado_academico, estudiante, etnia, comunidad, dpi_carnet, id_etapa_vida) values($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13) returning id_cliente',
    query_buscar_cliente: 'select * from clientes where lower(nombre) = $1 and lower(apellido) = $2',
    query_update_cliente: 'update clientes set direccion = $1, telefono = $2, correo = $3, edad = $4, genero = $5, grado_academico = $6, estudiante = $7, etnia = $8, comunidad = $9, dpi_carnet = $10, id_etapa_vida = $11 where lower(nombre) = $12 and lower(apellido) = $13 returning id_cliente',
    query_etapas_vida: 'select id_etapa from etapa_vida where edad_minima <= $1 and edad_maxima >= $1',
    getCliente:'select * from clientes where lower(nombre) || \' \' || lower(apellido) = $1',
    visita: 'insert into visitas(fecha_visita, id_cliente, firma,visita_museo, consulta_biblioteca) values($1,$2,$3,$4,$5)'
};

module.exports = {
    clienteQuerys
}