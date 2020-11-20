const mysql = require('mysql');

const bbdd = mysql.createConnection({
    host:'localhost',
    user:'tuusuario',
    password:'tupass',
    database:'tp_final',

});

bbdd.connect();

console.log("La conexion a la bbdd ha sido exitosa");

module.exports = bbdd;