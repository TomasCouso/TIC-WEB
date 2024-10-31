//EL CODIGO RECIBE UN ERROR, LE DA FORMATO Y DEVUELVE EL JSON
const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500; // EL 500 ES POR DEFECTO POR SI NO HAY NINGUN CODIGO ESPECIFICO
  const message = err.message || "Error desconocido"; // AQUI VA EL MENSAJE PERSONALIZADO O UN MENSAJE GENERICO

  res.status(statusCode).json({
    status: "ERROR",
    statusCode,
    message,
  });
};

module.exports = errorHandler;
