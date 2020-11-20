//Guardamos en una constante lo q nos da express
const express = require('express'); //ESTA

//Guardamos en una constante lo que nos da cors
const cors = require('cors'); //ESTA

//inicializo las funcionalidades de express
const servidor = express(); //ESTA

//seteo el puerto disponible en el sistema o el 3000
servidor.set('port', process.env.PORT || 3000); //ESTA

//formato de datos para recibir y enviar datos es json
servidor.use(express.json()); //ESTA

//Nos permite la comunicacion entre servidores: vue y api
servidor.use(cors()); //ESTA

//usamos las rutas de cliente
servidor.use(require('./rutas/rutas.clientes')); //ESTA EN UNO

//usamos las rutas de equipo
servidor.use(require('./rutas/rutas.equipos')); //ESTA EN UNO

//doy arranque al servidor
servidor.listen(servidor.get('port')); //ESTA

//muestro mensaje de ejecucion
console.log('El servidor se encuentra corriendo en el puerto', servidor.get('port'));

