const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./helpers/errorHandler.js");
const {
  validarJwt,
  validarEmpleado,
  existeToken,
  esEmpleado,
} = require("./middlewares/validations.js");

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    this.cargarMiddlewares();
    this.cargarRutas();
    this.conectarABD();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en el puerto ${this.port}`);
    });
  }

  cargarMiddlewares() {
    const corsOptions = {
      origin: "http://localhost:5173",
      credentials: true,
    };

    this.app.use(cors(corsOptions));
    this.app.use(express.json());
    this.app.use(cookieParser());
  }

  cargarRutas() {
    this.app.use(
      "/api/empleados",
      [validarJwt, esEmpleado, validarEmpleado],
      require("./routes/empleados")
    );
    this.app.use(
      "/api/home",
      [existeToken, esEmpleado],
      require("./routes/home")
    );
    this.app.use("/api/auth", require("./routes/auth"));
    this.app.use(errorHandler);
  }

  async conectarABD() {
    try {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log("Conexión exitosa a la base de datos");
    } catch (e) {
      console.error("Error al conectar con la base de datos:", e);
      mongoose.disconnect();
    }
  }
}

module.exports = Server;
