const jwt = require("jsonwebtoken");
const Empleado = require("../models/empleados");
const { checkExists } = require("../helpers/errorHandler");

const validarJwt = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  checkExists(token, "No existe token", 403);

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    checkExists(!err, "Token inválido", 403);
    req.user = user.datosUsuario;
  
    console.log("validarJwt", req.user);
    next();
  });
};

const validarAdmin = (req, res, next) => {
  console.log("validar admin", req.usuario);
  checkExists(req.usuario.rol === "admin", "Autenticación no válida", 401);
  next();
};

const validarEmpleado = (req, res, next) => {
  console.log("validar empleado", req.usuario);
  checkExists((req.usuario || req.usuario.rol === "becario"), "Autenticación no válida", 401);
  next();
};

const esEmpleado = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, async (err, user) => {
      if (err) {
        return next();
      }

      const email = user.datosUsuario.email;

      if (email) {
        try {
          const empleado = await Empleado.findOne({ email });
          if (empleado) {
            req.usuario = {
              id: empleado._id,
              nombre: empleado.nombre,
              rol: empleado.rol,
              email: empleado.email,
            };
            console.log("es empleado", req.usuario);
          }
        } catch (e) {
          return next();
        }
      }
      next();
    });
  } else {
    next();
  }
};

const existeToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.usuario = user.datosUsuario;
      }
      console.log("existeToken", req.usuario);
      next(err);
    });
  } else {
    next();
  }
};

module.exports = {
  validarAdmin,
  validarJwt,
  validarEmpleado,
  esEmpleado,
  existeToken,
};
