const express = require('express');

const rutasEquipos = express.Router();

const bbdd = require('../database');

const inet = require("inet");

//LISTO LOS EQUIPOS EXISTENTES EN LA BBDD
rutasEquipos.get('/equipo', async (req,res) => {

    const respuesta = await bbdd.query('select id_host, hostname, inet_ntoa(dir_ip) as dir_ip, fecha_carga, cliente from equipos', (err,rows) => {

        if(!err){
	        res.json(rows);
        }else{
            res.json(err);
        }
    });

    //res.json('haciendo uso de la ruta a traves del metodo GET, obtendremos la lista de equipos');
});

//ELIMINO UN EQUIPO CON UN ID DETERMINADO
rutasEquipos.delete('/equipo/:id', async (req,res) => {

    const ideq = req.params.id;
    const respuesta = await bbdd.query('delete from equipos where id_host = ?',[ideq], (err,rows) => {

        if(!err){
            res.json('Se ha realizado exitosamente la eliminacion del equipo');
        }else{
            res.json('Error al eliminar el equipo solicitado');
        }
    });
    // res.json('haciendo uso de la ruta a para eliminar un equipo');
});

//AGREGO UN NUEVO EQUIPO A LA BBDD
rutasEquipos.post('/equipo', async (req,res) => {

    let unEquipo = {
        hostname:req.body.hostname,
        dir_ip:inet.aton(req.body.dir_ip),
        fecha_carga:req.body.fecha_carga,
        cliente:req.body.cliente
    }

    const respuesta = await bbdd.query('insert into equipos set ?', [unEquipo], (err,rows) => {

        if(!err){
            res.json('Se ha realizado exitosamente la insercion del equipo');
        }else{
            res.json('NO se pudo realizar la insercion del equipo nuevo');
        }
    });

    //res.json('haciendo uso de la ruta para insertar un equipo');
});

//ACTUALIZO UN EQUIPO EXISTENTE EN LA BBDD
rutasEquipos.put('/equipo/:id', async (req,res) => {

    const ideq = req.params.id;

    const unEquipo = {
        hostname:req.body.hostname,
        dir_ip:inet.aton(req.body.dir_ip),
        fecha_carga:req.body.fecha_carga,
        cliente:req.body.cliente
    }

    const respuesta = await bbdd.query('update equipos set ? where id_host = ?', [unEquipo, ideq], (err,rows) => {

        if(!err){
            res.json('Se ha realizado exitosamente la actualizacion del equipo');
        }else{
            res.json('Error al actualizar el equipo solicitado');
        }
    });
    // res.json('haciendo uso de la ruta para actualizar un equipo');
});

//BUSCO UN EQUIPO POR ID
rutasEquipos.get('/equipo/:id', async (req,res) => {

    var ideq = req.params.id;

    const respuesta = await bbdd.query('select id_host, hostname, (inet.ntoa(dir_ip)), fecha_carga, cliente from equipos where id_host = ?', [ideq], (err,rows) => {

        if(!err){
            res.json(rows[0]);
        }else{
            res.json('Error al buscar el equipo solicitado');
        }
    });

    //res.json('haciendo uso de la ruta a traves del metodo GET, obtendremos la lista de equipos');
});

module.exports = rutasEquipos;