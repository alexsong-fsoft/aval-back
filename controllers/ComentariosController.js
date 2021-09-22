'use strict'

const { response, request } = require('express');
const axios = require('axios');
const _ = require('lodash');
const Comentarios = require('../models/comentarios');
const { leerDB, guardarDB } = require('../helpers/upload-file');

const all = async (req, res, next) => {
    var params = req.body;

    let axiosConfig = {
        method: "GET",
        url: `${process.env.API_URL}/empresas`,
        headers: {
            Authorization: req.headers.authorization,
        },
    };

    try {
        
        let response = await axios(axiosConfig);
    
        if (response.status === 200) {
            res.contentType('application/json').status(200);
            res.send(response.data);
        } else {
            res.contentType('application/json').status(500);
            res.send(response.data);
        }
    } catch (error) {
        res.contentType('application/json').status(500);
        res.send(error.message);
        next();
    }

    return;


}


const show = async (req, res, next) => {
    var params = req.params;
    
    // let axiosConfig = {
    //     method: "GET",
    //     url: `${process.env.API_URL}/empresas/${params.id}`,
    //     headers: {
    //         Authorization: req.headers.authorization,
    //     },
    // };

    try {
        
        let comentarios = new Comentarios();

        let comentariosDB = leerDB();
    
        if ( comentariosDB ) { // cargar tareas
            comentarios.cargarComentariosFromArray( comentariosDB );
        }

        //console.log(comentarios.listadoArr);
        let dataFiltered = comentarios.listadoArr.filter(obj => obj.producto == parseInt(params.id));
            //.sort((a, b) => a.estrellas > b.estrellas);

        let objResp = comentarios.makeTree(dataFiltered, null);
        console.log(objResp);
        res.contentType('application/json').status(200);
        res.send(objResp);
    
    } catch (error) {
        res.contentType('application/json').status(500);
        res.send(error.message);
        next();
    }

    return;
    
}

const create = async (req, res, next) => {
    var params = req.body;

    console.log('body', params);

    let data = {
        user: !_.isUndefined(params.user) ? params.user : null,
        comentario: !_.isUndefined(params.comentario) ? params.comentario : null,
        estrellas: !_.isUndefined(params.estrellas) ? params.estrellas : null,
        producto: !_.isUndefined(params.producto) ? params.producto : null,
        parentId: !_.isUndefined(params.parentId) ? params.parentId : null,
        fechaCreacion: !_.isUndefined(params.fechaCreacion) ? params.fechaCreacion : null,
    };
  
    console.log(data);

    try {
        
        let comentarios = new Comentarios();

        let comentariosDB = leerDB();
    
        if ( comentariosDB ) { // cargar tareas
            comentarios.cargarComentariosFromArray( comentariosDB );
        }
    
        comentarios.crearComentario( data );

        let objResp = comentarios.listadoArr;
        guardarDB( objResp );

        res.contentType('application/json').status(201);
        res.send(objResp);
    
    } catch (error) {
        res.contentType('application/json').status(500);
        res.send(error.message);
        next();
    }

    return;
}

const update = async (req, res, next) => {
    var params = req.body;
    var id = req.params.id;

    let axiosConfig = {
        method: "PUT",
        url: `${process.env.API_URL}/empresas/${id}`,
        data: {
            id: !_.isUndefined(params.id) ? params.id : null,
            nombre: !_.isUndefined(params.nombre) ? params.nombre : null,
            direccion: !_.isUndefined(params.direccion) ? params.direccion : null,
            telefono: !_.isUndefined(params.telefono) ? params.telefono : null,
            email: !_.isUndefined(params.email) ? params.email : null,
            estado: !_.isUndefined(params.estado) ? params.estado : null,
            observacion: !_.isUndefined(params.observacion) ? params.observacion : null,
            fechaCreacion: !_.isUndefined(params.fechaCreacion) ? params.fechaCreacion : null,
        },
        headers: {
            Authorization: req.headers.authorization,
        },
    };

    try {
        
        let response = await axios(axiosConfig);
    
        if (response.status === 201) {
            res.contentType('application/json').status(201);
            res.send(response.data);
        } else {
            res.contentType('application/json').status(500);
            res.send(response.data);
        }
    } catch (error) {
        res.contentType('application/json').status(500);
        res.send(error.message);
        next();
    }

    return;
}

const deleteU = async (req, res, next) => {
    var params = req.body;
    var id = req.params.id;

    let axiosConfig = {
        method: "DELETE",
        url: `${process.env.API_URL}/empresas/${id}`,
        headers: {
            Authorization: req.headers.authorization,
        },
    };

    try {
        
        let response = await axios(axiosConfig);
    
        if (response.status === 200) {
            res.contentType('application/json').status(200);
            res.send(response.data);
        } else {
            res.contentType('application/json').status(500);
            res.send(response.data);
        }
    } catch (error) {
        res.contentType('application/json').status(500);
        res.send(error.message);
        next();
    }

    return;
}


module.exports = {
    all,
    show,
    create,
    update,
    deleteU,
}