const jwt = require("jsonwebtoken");

const validarJwt = async (req, res, next) => {
  const token = req.headers.token;

  console.log(token);

  if (!token) {
    const error = new Error("No existe token");
    error.statusCode = 403;
    return next(error);

    //return res.status(403).json({ message: "No existe token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      const error = new Error("Token inválido");
      error.statusCode = 403;
      return next(error);

      //return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  });
};

//VERIFICA SI ESTA AUTENTICADO COMO ADMIN
const validarAdmin = (req, res, next) => {
  if (req.user.rol !== "ADMIN") {
    const error = new Error("Autenticación no válida");
    error.statusCode = 401;
    return next(error);

    //res.status(401).json({ mensaje: "Autenticación no válida" });
  }
  return next();
};

//VERIFICA SI ESTA AUTENTICADO
const validarAuth = (req, res, next) => {
  if (req.user.rol != "ADMIN" && req.user.rol != "EMPLEADO") {
    const error = new Error("Autenticación no válida");
    error.statusCode = 401;
    return next(error);

    //res.status(401).json({ mensaje: "Autenticación no válida" });
  }
  next();
};

module.exports = {
  validarAdmin,
  validarJwt,
  validarAuth,
};
