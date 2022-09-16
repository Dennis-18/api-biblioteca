const {pool} = require('../db-config');
const {querys_comunidades} = require('./comunidades.querys');

const comunidades = (req, res) => {
    try{
        pool.query(querys_comunidades.comunidades, (error, results) => {
            if(error){
                res.json({id:0, mensaje: error});
            }
            if(results.rowCount > 0){
                res.json({id:1, mensaje: results.rows});
            } else{
                res.json({id:2, mensaje: 'No existen registros'});
            }
        })
    } catch(error){
        res.json({id:0, mensaje: error});
    }
}

module.exports = {
    comunidades
}