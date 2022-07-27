const {connection} = require('./index');


const query = 'SELECT * FROM LIBRO';

const getLibros = (request, response) => {
    connection.query(query, (error, results) =>{
        if(error){
            console.log(query);
            throw error;
        }
        response.status(200).json(results);
    });
};

module.exports = {
    getLibros
}