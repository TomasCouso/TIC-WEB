const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./helpers/errorHandler.js");
const {validarJwt, validarEmpleado} = require("./middlewares/validations.js")

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
    this.app.use(express.json());
  }

  cargarRutas() {
    this.app.use("/api/empleados", validarJwt,  require("./routes/empleados"));
    this.app.use("/api/home", require("./routes/home"));
    this.app.use("/api/auth", require("./routes/auth"));
    this.app.use(errorHandler);
  }

  async conectarABD() {
    try {
      await mongoose.connect(process.env.MONGODB_URI); //DEBEN SER ASINCRONOS
      console.log("Conexión exitosa a la base de datos");
      
    } catch (e) {
      console.error("Error al conectar con la base de datos:", e);
      mongoose.disconnect();
    }
  }
}

module.exports = Server;
