const express = require('express')

const router= express.Router()

const {getTodos, crear, getPorId, actualizarPorId, eliminarPorId} =require("../controllers/materiales")

//middlewares

router.route('/')
    .get(getTodos)
    .post(crear)

router.route('/:id')
    .get(getPorId)
    .put(actualizarPorId)
    .delete(eliminarPorId)

module.exports = router