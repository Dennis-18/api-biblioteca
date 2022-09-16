const {pool} = require('../db-config');
const {querys_etnias} = require('./etnias.querys');

//recupera las etnias de la base de datos
const etnias = (req, res) => {
    try{
         pool.query(querys_etnias.buscar_etnias, (error, results) => {
            if(error){
                console.log('aqui');
                res.json({id: 0, mensaje: error});
            }
            res.json({id:1, mensaje: results.rows});
         })
    } catch(error){
        res.json({id:0, mensaje: 'error catch'});
    }
}

module.exports = {
    etnias
}