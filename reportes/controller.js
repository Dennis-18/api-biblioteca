const {pool} = require('../db-config');
const {query} = require('./querys');


const genero_cantidad = (req, res) =>{
    console.log('genero_cantidad');
    try{
        pool.query(query.cantidad_genero, (error, results) =>{
            if(error){
                console.log('error query ' + error);
            }
            if(results){
                if(results.rowCount > 0){
                    res.json({id:1, mensaje: results.rows});
                }
            }
        })
    } catch(error){
        console.log(error);
    }
};

const cantidad_visitas = (req,res) =>{
    try{
        pool.query(query.cantidad_visitas, (error, results) =>{
            if(error){
                console.log('error query ' + error);
                res.json({id:0, mensaje: error});
            }
            if(results){
                if(results.rowCount > 0){
                    res.json({id:1, mensaje: results.rows});
                }
            }
        })
    } catch(error){
        res.json({id:0, mensaje: error});
        console.log('error catch ' + error);
    }
}

const cantidad_fecha = (req,res) =>{
    try{
        pool.query(query.cantidad_fecha, (error, results) =>{
            if(error){
                console.log('error query ' + error);
                res.json({id:0, mensaje: error});
            }
            if(results){
                if(results.rowCount > 0){
                    res.json({id:1, mensaje: results.rows});
                }
            }
        })
    } catch(error){
        console.log('error catch ' + error);
        res.json({id:0, mensaje: error});
    }
}

const listadoGenero = (req, res) => {
    const {genero} = req.params;
    console.log(genero);
    try{
        pool.query(query.listado_genero, [genero], (error, results) => {
            if(error){
                console.log('error query ' + error);
                res.json({id: 0, mensaje: error});
            }

            if(results){
                if(results.rowCount > 0){
                    res.json({id: 1, mensaje: results.rows});
                }else{
                    console.log('no hay resultados ')

                }
            }
            // console.log('no hay resultados ')
        })
    } catch(error){
        console.log('error catch ' + error);
    }

}

const listadoFecha = (req, res) => {
    const {fecha} = req.params;
    console.log(fecha);
    try{
        pool.query(query.listado_fecha, [fecha], (error, results) => {
            if(error){
                console.log('error en query ' + error);
                res.json({id: 0, mensaje: error});
            }

            if(results){
                if(results.rowCount > 0){
                    res.json({id: 1, mensaje: results.rows});
                }
            }
        })
    } catch(error){
        console.log(error);
    }

}

const years = (req, res) => {
    try{
        pool.query(query.years, (error,results) => {
            if(error){
                console.log(`Error en query years: ${error}`)
                res.json({id:0, mensaje:`Error en query years: ${error}`})
            }

            if(results && results.rowCount > 0){
                res.status(200).json({id:1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(`Error en catch years: ${error}`);
        res.status(400).json({id:1, mensaje: `Error en catch years: ${error}`})
    }
}

const visitasMes = (req, res) => {
    const {year} = req.params;

    try{
        pool.query(query.visitasMes, [year], (error, results) => {
            if(error){
                console.log(`Error query visitasMes: ${error}`);
                res.json({id:0, mensaje: `Error query visitasMes: ${error}`})
            }

            if(results && results.rowCount > 0){
                res.json({id:1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(`Error catch visitasMes: ${error}`);
        res.status(400).json({id:0, mensaje: `Error catch visitasMes: ${error}`})
    }
}

const visitasEtapaVida = (req, res) => {
    try{
        pool.query(query.visitasEtapaVida, (error, results) => {
            if(error){
                console.log(`Error query visitasEtapaVida: ${error}`);
                res.json({id:0, mensaje: `Error query visitasEtapaVida: ${error}`})
            }

            if(results && results.rowCount > 0){
                res.json({id:1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(`Error catch visitasEtapaVida: ${error}`);
        res.status(400).json({id:0, mensaje: `Error catch visitasEtapaVida: ${error}`})
    }
}

const visitantesMes = (req, res) => {
    const {year, month} = req.params;
    try{
        pool.query(query.visitantesMes,[year, month], (error, results) => {
            if(error){
                console.log(`Error query visitantesMes: ${error}`);
                res.json({id:0, mensaje: `Error query visitantesMes: ${error}`})
            }

            if(results && results.rowCount > 0){
                res.json({id:1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(`Error catch visitantesMes: ${error}`);
        res.status(400).json({id:0, mensaje: `Error catch visitantesMes: ${error}`})
    }
}

const visitantesEtapaVida = (req, res) => {
    const {etapa_vida} = req.params;
    console.log('visitantesEtapaVida: ' + etapa_vida);
    try{
        pool.query(query.visitantesEtapaVida,[etapa_vida], (error, results) => {
            if(error){
                console.log(`Error query visitantesEtapaVida: ${error}`);
                res.json({id:0, mensaje: `Error query visitantesEtapaVida: ${error}`})
            }

            if(results && results.rowCount > 0){
                res.json({id:1, mensaje: results.rows});
            }
        })
    } catch(error){
        console.log(`Error catch visitantesEtapaVida: ${error}`);
        res.status(400).json({id:0, mensaje: `Error catch visitantesEtapaVida: ${error}`})
    }
}
module.exports = {
    genero_cantidad,
    cantidad_visitas,
    cantidad_fecha,
    listadoGenero,
    listadoFecha,
    years,
    visitasMes,
    visitasEtapaVida,
    visitantesMes,
    visitantesEtapaVida
}