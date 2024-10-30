const jwt = require("jsonwebtoken");
const { checkExists } = require("./errorHandler");

const validarJwt = async (req, res, next) => {
  const token = req.headers.token;
  checkExists(token, "No existe token", 403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    checkExists(!err, "Token inválido", 403);
    req.user = user;
    next();
  });
};

const validarAdmin = (req, res, next) => {
  const isAdmin = req.user.rol === "ADMIN";
  checkExists(isAdmin, "Autenticación no válida", 401);
  return next();
};

const validarAuth = (req, res, next) => {
  const isAdminOrEmp = req.user.rol === "ADMIN" || req.user.rol === "EMPLEADO";
  checkExists(isAdminOrEmp, "Autenticación no válida", 401);
  next();
};

module.exports = {
  validarAdmin,
  validarJwt,
  validarAuth,
};
