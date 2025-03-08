const jwt = require("jsonwebtoken");
const Empleado = require("../models/empleados");

const validarJwt = async (req, res, next) => {
  const token = req.cookies.token;

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
    // console.log("validarJwt", req.user);
    next();
  });
};

const validarAdmin = (req, res, next) => {
  // console.log("validar admin", req.usuario);

  if (req.usuario.rol !== "admin") {
    const error = new Error("Autenticación no válida ADMIN");
    error.statusCode = 401;
    return next(error);
  }
  next();
};

const validarEmpleado = (req, res, next) => {
  // console.log("validar empleado", req.usuario);

  if (
    !req.usuario ||
    (req.usuario.rol !== "admin" && req.usuario.rol !== "becario")
  ) {
    const error = new Error("Autenticación no válida de empleado");
    error.statusCode = 401;
    return next(error);
  }

  next();
};

const esEmpleado = async (req, res, next) => {
  const token = req.cookies.token;

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
            // console.log("es empleado", req.usuario);
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
  const token = req.cookies.token;

  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
      if (!err) {
        req.usuario = user.datosUsuario;
      }
      // console.log("existeToken", req.usuario);
      next(err);
    });
  } else {
    next();
  }
};

const validarPrimerAdmin = async (req, res, next) => {
  const administradores = await Empleado.find({ rol: "admin" });

  if (administradores.length === 0 && req.body.rol === "admin") {
    return next();
  }

  const error = new Error(
    administradores.length > 0
      ? `Ya existe un administrador. Comuníquese con: ${administradores[0].email}`
      : "No está autorizado para crear el primer administrador."
  );
  error.statusCode = 403;
  next(error);
};

module.exports = {
  validarAdmin,
  validarJwt,
  validarEmpleado,
  esEmpleado,
  existeToken,
  validarPrimerAdmin,
};
