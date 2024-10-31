const jwt = require("jsonwebtoken");
const Empleado = require("../models/empleados");

const validarJwt = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  // console.log(token);

  if (!token) {
    const error = new Error("No existe token");
    error.statusCode = 403;
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Token inválido");
      error.statusCode = 403;
      return next(error);
    }
    req.user = user.datosUsuario;
    next();
  });
};

//VERIFICA SI ESTA AUTENTICADO COMO ADMIN
const validarAdmin = (req, res, next) => {
  if (req.user.rol !== "admin") {
    const error = new Error("Autenticación no válida ADMIN");
    error.statusCode = 401;
    return next(error);
  }
   next();
};

//VERIFICA SI es admin o empleado
const validarEmpleado = (req, res, next) => {
  // console.log("validar empleado", req.user);

  if (req.user.rol !== "admin" && req.user.rol !== "becario") {
    const error = new Error("Autenticación no válida de empleado");
    error.statusCode = 401;
    return next(error);
  }
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
            req.user = {
              id: empleado._id,
              nombre: empleado.nombre,
              rol: empleado.rol,
              email: empleado.email,
            };
          }
        } catch (e) {
          return next(); 
        }
      }

      // console.log("es empleado",req.user);
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
        req.user = user.datosUsuario;
      }
      // console.log(req.user);
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
