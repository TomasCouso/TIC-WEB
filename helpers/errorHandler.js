const checkExists = (resource, message = "Recurso no encontrado", statusCode = 500) => {
    if (!resource) {
        const error = new Error(message);
        error.statusCode = statusCode;
        throw error;
    }
};

const errorHandler = (err, req, res, next) => { 
    const statusCode = err.statusCode || 500;
    const message = err.message || "Error desconocido";

    res.status(statusCode).json({
        status: "ERROR",
        statusCode,
        message,
    });
};

module.exports = {
    errorHandler, 
    checkExists
};