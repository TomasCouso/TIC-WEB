//EL CODIGO RECIBE UN ERROR, LE DA FORMATO Y DEVUELVE EL JSON

const handleError = (err, req, res, next) => {
    const statusCode = err.statusCode || 500; // EL 500 ES POR DEFECTO POR SI NO HAY NINGUN CODIGO ESPECIFICO
    const message = err.message || "Error interno del servidor"; // AQUI VA EL MENSAJE PERSONALIZADO O UN MENSAJE GENERICO 

    res.status(statusCode).json({
        status: "ERROR",
        statusCode,
        message,
    });
};

module.exports = handleError;

//para usarlo hay que:
//const handleError = require("./helpers/errorHandler.js");
//CUANDO LO NECESITAMOS: handleError(err, res); o tambien handleError(err) 
