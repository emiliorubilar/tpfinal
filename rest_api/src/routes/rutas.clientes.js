const express = require('express');

const rutasCliente = express.Router();

const bbdd = require('../database');

//LISTO LOS CLIENTES EXISTENTES EN LA BBDD
rutasCliente.get('/cliente', async (req,res) => {

    const respuesta = await bbdd.query('select * from clientes', (err,rows) => {

        if(!err){
            res.json(rows);
        }else{
            res.json('Error al traer los datos de la tabla clientes');
        }
    });

    //res.json('haciendo uso de la ruta a traves del metodo GET, obtendremos la lista de clientes');
});

//ELIMINO UN CLIENTE CON UN ID DETERMINADO
rutasCliente.delete('/cliente/:id', async (req,res) => {

    const idc = req.params.id;
    const respuesta = await bbdd.query('delete from clientes where id_cliente = ?',[idc], (err,rows) => {

        if(!err){
            res.json('Se ha realizado exitosamente la eliminacion del cliente');
        }else{
            res.json('Error al eliminar el cliente solicitado');
        }
    });
    // res.json('haciendo uso de la ruta a para eliminar un cliente');
});

//AGREGO UN NUEVO CLIENTE A LA BBDD
rutasCliente.post('/cliente', async (req,res) => {

    const unCliente = req.body;

    const respuesta = await bbdd.query('insert into clientes set ?', [unCliente], (err,rows) => {

        if(!err){
            res.json('Se ha realizado exitosamente la insercion del cliente');
        }else{
            res.json('Error al insertar el cliente solicitado');
        }
    });

    //res.json('haciendo uso de la ruta para insertar un cliente');
});

//ACTUALIZO UN CLIENTE EXISTENTE EN LA BBDD
rutasCliente.put('/cliente/:id', async (req,res) => {

    const idc = req.params.id;
    const unCliente = req.body;

    const respuesta = await bbdd.query('update clientes set ? where id_cliente = ?', [unCliente, idc], (err,rows) => {

        if(!err){
            res.json('Se ha realizado exitosamente la actualizacion del cliente');
        }else{
            res.json('Error al actualizar el cliente solicitado');
        }
    });
    // res.json('haciendo uso de la ruta para actualizar un cliente');
});

//BUSCO UN CLIENTE POR ID
rutasCliente.get('/cliente/:id', async (req,res) => {

    var idc = req.params.id;

    const respuesta = await bbdd.query('select * from clientes where id_cliente = ?', [idc], (err,rows) => {

        if(!err){
            res.json(rows[0]);
        }else{
            res.json('Error al buscar el cliente solicitado');
        }
    });

    //res.json('haciendo uso de la ruta a traves del metodo GET, obtendremos la lista de clientes');
});

module.exports = rutasCliente;