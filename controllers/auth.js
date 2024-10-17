const jwt = require("jsonwebtoken");

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const empleado = await empleados.findOne({ email });

    if (empleado) {
      const esValida = await empleado.comparePassword(password);

      if (esValida) {
        const token = jwt.sign({ id: empleado._id }, process.env.JWT_SECRET, {
          expiresIn: "5h",
        });

        res.status(200).json({
          mensaje: "Inicio de sesión exitoso",
          token,
        });
      } else {
        res.status(401).json({ mensaje: "Contraseña incorrecta" });
      }
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

module.exports = {
  login,
};
