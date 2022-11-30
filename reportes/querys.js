const query = {
    cantidad_genero: 'select cl.genero as name,count(cl.genero) as value from clientes as cl join visitas as vs on vs.id_cliente = cl.id_cliente group by cl.genero;',
    cantidad_visitas: 'select count(id_visita) from visitas;',
    cantidad_fecha: 'select count(id_visita) as value, to_char(fecha_visita, \'YYYY-MM-DD\') as name from visitas group by fecha_visita order by fecha_visita;',
    listado_genero: `select cl.nombre, cl.apellido, cl.direccion, cl.correo, ga.descripcion as grado_academico, cl.estudiante, et.descripcion as etnia, cm.descripcion as comunidad, ev.descripcion as etapa_vida, n.descripcion as nacionalidad, cl.genero 
	from clientes as cl
	inner join grado_academico as ga
	on cl.grado_academico = ga.id_grado 
	inner join etnias as et
	on cl.etnia = et.id_etnia
	inner join comunidades as cm 
	on cl.comunidad = cm.id_comunidad 
	inner join etapa_vida as ev
	on cl.id_etapa_vida = ev.id_etapa
	inner join nacionalidades as n 
	on cl.nacionalidad = n.id_nacionalidad
	where cl.genero = $1;`,
    listado_fecha: `select cl.nombre, cl.apellido, cl.direccion, cl.correo, ga.descripcion as grado_academico, cl.estudiante, et.descripcion as etnia, cm.descripcion as comunidad, ev.descripcion as etapa_vida, n.descripcion as nacionalidad ,v.fecha_visita  
	from clientes as cl
	inner join grado_academico as ga
	on cl.grado_academico = ga.id_grado 
	inner join etnias as et
	on cl.etnia = et.id_etnia
	inner join comunidades as cm 
	on cl.comunidad = cm.id_comunidad 
	inner join etapa_vida as ev
	on cl.id_etapa_vida = ev.id_etapa
	inner join visitas v
	on cl.id_cliente = v.id_cliente 
	inner join nacionalidades as n 
	on cl.nacionalidad = n.id_nacionalidad
	where v.fecha_visita = $1;`,
	years: `select distinct extract(year from fecha_visita) from visitas v ;`,
	visitasMes: `select  to_char(fecha_visita, 'TMMonth')  as name, count(id_visita) as value 
	from visitas v where extract(year from fecha_visita) = $1 group by extract(month from fecha_visita), to_char(fecha_visita, 'TMMonth');`,
	visitasEtapaVida: `select (select descripcion from etapa_vida ev where id_etapa = c.id_etapa_vida) as name, count(id_visita) as value  from visitas v 
	inner join clientes c 
	on c.id_cliente = v.id_cliente 
	group by c.id_etapa_vida;`,
	visitantesMes: `select c.nombre, c.apellido, c.direccion, c.correo, 
	ga.descripcion as grado_academico, c.estudiante, e.descripcion as etnia, co.descripcion as comunidad, ev.descripcion as etapa_vida, 
	n.descripcion as nacionalidad, v.fecha_visita
	from clientes c 
	join grado_academico ga 
	on ga.id_grado = c.grado_academico 
	join etapa_vida ev 
	on ev.id_etapa = c.id_etapa_vida 
	join nacionalidades n 
	on n.id_nacionalidad = c.nacionalidad 
	join visitas v 
	on v.id_cliente = c.id_cliente
	join etnias e 
	on e.id_etnia = c.etnia 
	join comunidades co
	on co.id_comunidad = c.comunidad 
	where extract (year from v.fecha_visita) = $1 and 
	extract (month from v.fecha_visita) = (select numero from meses where descripcion = $2);`,
	visitantesEtapaVida: `select c.nombre, c.apellido, c.direccion, c.correo, 
	ga.descripcion as grado_academico, c.estudiante, e.descripcion as etnia, co.descripcion as comunidad, ev.descripcion as etapa_vida, 
	n.descripcion as nacionalidad, v.fecha_visita
	from clientes c 
	join grado_academico ga 
	on ga.id_grado = c.grado_academico 
	join etapa_vida ev 
	on ev.id_etapa = c.id_etapa_vida 
	join nacionalidades n 
	on n.id_nacionalidad = c.nacionalidad 
	join visitas v 
	on v.id_cliente = c.id_cliente
	join etnias e 
	on e.id_etnia = c.etnia 
	join comunidades co
	on co.id_comunidad = c.comunidad 
	where ev.descripcion = $1;`
};

module.exports = {
    query
}