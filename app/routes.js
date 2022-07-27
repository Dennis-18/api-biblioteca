// const {Router} = require('express');
// const {getLibros} = require('./controladores');


// const router = Router();
// router.get('/libros', getLibros)

// // export default router;

// module.exports = {
//     router
// }

const {connection} = require('./index');


const getLibros = (request, response) => {
    connection.query('SELECT * FROM LIBRO', (error, results) =>{
        if(error){
            throw error;
        }
        response.status(200).json(results);
    });
};

route.route('/getLibros')
.get(getLibros);

module.exports = {
    route: route
}