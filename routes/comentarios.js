'use strict'

const express = require('express');

const comentariosController = require('../controllers/ComentariosController');

const api = express.Router();

api.get('/comentario', comentariosController.all)

api.get('/comentario/:id', comentariosController.show)

api.post('/comentario/registro', comentariosController.create)

api.put('/comentario/:id', comentariosController.update)

api.delete('/comentario/:id', comentariosController.deleteU)

module.exports = api;