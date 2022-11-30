
const { pool } = require('../db-config');
const {clienteQuerys} = require('./cliente.querys');

let fecha = new Date();
let year = fecha.getFullYear();
let mes = fecha.getMonth() + 1;
let dia = fecha.getDate();

let fecha_actual = year + '-' + mes +'-' + dia;

//verifica si ya existe un cliente, para saber si insertarlo o modificarlo
const buscarCliente = async (nombre, apellido) => {
    return new Promise((resolve, reject) => {
        try{
            pool.query(clienteQuerys.query_buscar_cliente,[nombre.toLowerCase(), apellido.toLowerCase()], (error, results) =>{
                if(error){
                    // res.json({id:0, mensaje:'fallo buscar cliente, fn buscarCliente'});
                    console.log('no encontro cliente')
                    reject("0");
                }
                if(results.rowCount > 0){
                    datos = results.rows;
                    console.log('encontro cliente' + datos[0].id_cliente);
                    resolve("1");
                    
                }
                resolve("2");
            })
    
        } catch(error){
            // res.json({id:0, mensaje: error});
            console.log('error buscarCliente');
            reject("0");
        }

    })
}

//define el id de etapa de vida teniendo en cuenta los parametros que estan guardados en la bd
const etapaVida = (edad)=>{
    return new Promise((resolve, reject) => {
        pool.query(clienteQuerys.query_etapas_vida, [edad], (error, results) =>{
            if(error){
                
                reject();
            }
            if(results.rowCount > 0){
                datos = results.rows;
                console.log('etapa encontrada: ' + datos[0].id_etapa);
                resolve(datos[0].id_etapa);
            }
        })

    })
    
}

const nuevoCliente = async (req, res) => {

    const {nombre, 
        apellido, 
        direccion,
        telefono, 
        correo, 
        edad, 
        genero, 
        grado_academico, 
        estudiante, 
        comunidad, 
        etnia, 
        dpi_carnet,
        firma,
        visita_museo,
        consulta_biblioteca,
        nacionalidad,
        pais
    } = req.body;

    //=========================================
    // let id_etapa_vida = await etapaVida(edad);


    //  etapaVida(edad).then((res) =>{
    //     id_etapa_vida = res;
    // });

    // console.log(id_etapa_vida);
    try{
        
        // buscarCliente(nombre, apellido).then((res) =>{
        //     existe = res;
        // });
        let existe = await buscarCliente(nombre, apellido);
        console.log('respuesta buscarCliente ' + existe);
        if(existe == '1'){
            pool.query(clienteQuerys.query_update_cliente, [
                direccion, telefono, correo, edad, genero, 
                grado_academico, estudiante, etnia, comunidad, 
                dpi_carnet, edad, nombre.toLowerCase(), apellido.toLowerCase()
            ], async (error, results) =>{
                if(error){
                    res.json({id:0, mensaje: error});
                } else{
                    // 
                    let {id_cliente} = results.rows[0];
                    console.log(`id_cliente actualizar cliente: ${id_cliente}`)
                    if(visita_museo !== ''){
                        await visita(id_cliente,firma,fecha_actual,visita_museo,consulta_biblioteca);
                    }
                    res.json({id:1, mensaje: 'Cliente actualizado exitosamente'});

                }
            }
                )
        } else{
            pool.query(clienteQuerys.query_nuevo_cliente, [
                nombre,
                apellido, direccion, telefono,
                correo, edad, genero, grado_academico,
                estudiante,etnia ,comunidad,  dpi_carnet, edad, nacionalidad, pais
            ], async (error, results) =>{
                if(error){
                    res.json({id:0, mensaje: 'Error al ingresar el cliente', error: error});
                } else{
                    let {id_cliente} = results.rows[0];
                    console.log(`id_cliente nuevo cliente: ${id_cliente}`)
                    if(visita_museo !== ''){
                        await visita(id_cliente,firma,fecha_actual,visita_museo,consulta_biblioteca);
                    }
                    res.json({id:1, mensaje:'Cliente registrado'});

                }
    
            })
        }


    } catch(error){
        res.json({id:0, mensaje: error});
    }
}


const getCliente = (req, res) =>{
    const {cliente} = req.body;
    console.log(cliente);
    try{
        pool.query(clienteQuerys.getCliente, [cliente.toLowerCase()], (error, results) =>{
            if(error){
                console.log('error get cliente');
                res.json({id:0, mensaje:error});
            }
            
            if(results.rowCount > 0){
                console.log('encuentra registros');
                res.json({id:1, mensaje: results.rows});
            } else{
                console.log('no encuentra cliente');
                res.json({id:2, mensaje: 'No existen registros'});
            }

        })
    } catch(error){
        res.json({id:0, mensaje:error});
    }
}

const visita = async (id_cliente, firma, fecha_visita, visita_museo, consulta_biblioteca) =>{
    try{
    
            pool.query(clienteQuerys.visita,[fecha_visita, id_cliente, firma, visita_museo,consulta_biblioteca], (error, results)=>{
                if(error){
                    console.log('error insertar visita  '+ error)
                    
                }
            })


      
    } catch(error){
        // res.json({id:0, mensaje:'Error al generar visita'});
        console.log('error catch visitas')
    }
}

const etapas_vida = (req, res) => {
    console.log('etapas de vida');
    try{
        pool.query(clienteQuerys.etapas_vida, (error, results) => {
            if(error){
                console.log('Error en query: ' + error);
                res.json({id: 0, mensaje: error});
            }
            if(results){
                if(results.rowCount > 0){
                    res.json({id: 1, mensaje: results.rows});
                } else{
                    console.log('No hay resultados');
                    res.json({id:2, mensaje: 'No hay resultados'});
                }
            }
        })
    } catch(error){
        console.log('error catch: ' + error);
        res.json({id:0, mensaje: error});
    }
}

const nacionalidades = (req, res) => {
    console.log('nacionalidades');
    try{
        pool.query(clienteQuerys.nacionalidades, (error, results) =>{
            if(error){
                console.log('error query: ' + error);
                res.json({id:0, mensaje: error});
            }

            if(results){
                if(results.rowCount > 0){
                    res.json({id:1, mensaje: results.rows});
                } else{
                    res.json({id:0, mensaje: 'no hay resultados'});
                    console.log('no hay resultados');
                }
            }
        })
    } catch(error){
        console.log('error catch: ' + error);
    }
}

module.exports = {
    nuevoCliente,
    getCliente,
    etapas_vida,
    nacionalidades
}