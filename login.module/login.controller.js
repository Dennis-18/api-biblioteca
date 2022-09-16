const {pool} = require('../db-config');
const {login_querys} = require('./login.querys');


const auth = (req, res) => {
    const {uname, password} = req.body;
    if(uname == '' || password == ''){
        res.json({id:2, mensaje: 'Revise sus credenciales'});
    } else {
        try{
            pool.query(login_querys.login, [uname, password], (error, results) => {
                if(error){
                    res.json({id:0, mensaje: error});
                }
    
                if(results.rowCount > 0){
                    res.json({id:1, mensaje: results.rows});
                } else{
                    res.json({id:2, mensaje: 'Ningun usuario coincide con las credenciales'});
                }
            })
        } catch(error){
            res.json({id: 0, mensaje: error});
        }
    }
}

module.exports = {
    auth
}