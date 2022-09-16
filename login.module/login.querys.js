const login_querys = {
    login: 'select id_usuario, nombre, apellido, puesto from usuarios where nombre = $1 and password = $2'
};

module.exports = {
    login_querys
}