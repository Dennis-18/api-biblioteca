//insert
export const createNewProducts = async (req, res) => {

    //mantener constantes con cons y variables con let
    const { name, description } = req.body;
    //si no es necesario mandar la cantidad se le asigna un valor por defecto
    // let { cantidad } = req.body;

    if (name == null || description == null) {
        return res.status(400).json({ msg: 'mal envio, datos incompletos' })
    }

    //   if (cantidad == null) cantidad = 0;

    try {
        const pool = await getConnection();

        await pool
            .request()
            .input("name", sql.VarChar, name)
            .input("description", sql.VarChar, description)
            .query(queries.addNewProduct);

        res.json({ name, description }) //si todo sale bien inserta, de lo contrario 
                                        //de lo contrario cae al catch    
    } catch (error) {
        res.status(500);
        res.send(error.message);

    }
}


const postCarta = (request, response) => {
    const {plato, descripcion, precio, disponible} = request.body;
    connection.query("INSERT INTO carta(plato, descripcion, precio, disponible) VALUES (?,?,?,?) ", 
    [plato, descripcion, precio, disponible],
    (error, results) => {
        if(error)
            throw error;
        response.status(201).json({"Item añadido correctamente": results.affectedRows});
    });
};





//login
export const logging = async (req, res) =>{
    console.log('inicia loging')
    const {correo, password} = req.body;
    console.log(req.body);
    if(correo == null || password == null){
        return res.status(400).json({msg: 'Complete los datos para continuar'});
    }
    try{
            const pool = await getConnection()
    const result = await pool
    .request()
    .input("correo", sql.VarChar, correo)
    .input("password", sql.VarChar, password)
    .query(queries.loggingUser);

        console.log(result.recordset[0]);
        if(result.recordset[0] == undefined){
            console.log('login incorrecto')
            return res.status(204).json({msg: 'Usuario o contraseña invalidos'});
        } else{
            console.log(result.recordset[0]);
            res.json(result.recordset[0]);
            console.log('login correcto')
        }
        
    } catch(error){
        res.status(500);
        res.send(error.message);
        //console.log(error);
        console.log('no sirve we :(');
    }
}