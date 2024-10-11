const express = require("express");

const mongoose = require('mongoose');

class Server {
  constructor() {
    this.port = process.env.PORT;
    this.app = express();
    //middlewares
    this.cargarRutas();
    this.conectarABD();
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en el puerto ${this.port}`);
    });
  }

  //middlewares

  cargarRutas() {
    this.app.use("/api/materiales", require("./routes/materiales"));
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
