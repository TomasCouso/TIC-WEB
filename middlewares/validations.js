const jwt = require("jsonwebtoken");

const validarJwt = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(403).json({ message: "No existe token" });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(403).json({ message: "Token inválido" });
    }
    req.user = user;
    next();
  });
};

//VERIFICA SI ESTA AUTENTICADO COMO ADMIN
const validarAdmin = (req, res, next) => {
  if (req.user.rol === "ADMIN") {
    return next();
  }
  res.status(401).json({ mensaje: "Autenticación no válida" });
};

//VERIFICA SI ESTA AUTENTICADO
const validarAuth = (req, res, next) => {
  if (req.user.rol != "ADMIN" && req.user.rol != "EMPLEADO") {
    res.status(401).json({ mensaje: "Autenticación no válida" });
  }
  next();
};

module.exports = {
  validarAdmin,
  validarJwt,
  validarAuth,
};
