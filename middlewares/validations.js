const { response, request } = require('express');
const jwt = require('jsonwebtoken');

const validarJwt = async (req, res, next) => {
    //COMPLETAR JWT
    try {
        next();
    } catch (e) {
    }
    next();
}

const validarAdmin = (req, res, next) => {
    
}

const validarAuth = (req, res, next) => {
    if (req.user.rol != "ADMIN" || req.user.rol != "EMPLEADO"){
        resp.status(401).json({msg: "Autenticación no válida"})
    }
    
    next();
}