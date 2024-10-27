const express = require("express");
const mongoose = require("mongoose");
const errorHandler = require("./helpers/errorHandler.js");

class Server {
  constructor() {
    this.port = process.env.PORT; //CARGA VARIABLE DE ENTORNO DEL ARCHIVO .ENV
    this.app = express(); //express() CREA UNA APLICACION DE SERVIDOR WEB Y SE GUARDA EN THIS.APP
    this.cargarMiddlewares(); //LLAMO A FUNCION PARA CARGAR LOS MIDDLEWARES
    this.cargarRutas(); //LLAMO A FUNCION PARA CARGAR LAS RUTAS
    this.conectarABD(); //LLAMO A FUNCION PARA CONEXION A LA BD
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server corriendo en el puerto ${this.port}`);
    });
  }

  cargarMiddlewares() {
    this.app.use(express.json()); //PARSEA EL REQUEST EN JSON PARA ACCEDER DESDE req.body
  }

  cargarRutas() {
    //ESTABLEZCO EL PREFIJO DE RUTA (/api/empleados) QUE SERÁ MANEJADO POR MI ROUTES/EMPLEADOS.JS
    this.app.use("/api/empleados", require("./routes/empleados"));
    this.app.use("/api/home", require("./routes/home"));

    //MANEJO DE ERRORES GLOBAL, AL FINAL DE LAS RUTAS
    this.app.use(errorHandler);
    this.app.use("/api/auth", require("./routes/auth"));
  }

  async conectarABD() {
    //CONEXION A LA BD CON MONGOOSE

    try {
      //INTENTO CONECTARME A LA BD
      await mongoose.connect(process.env.MONGODB_URI); //DEBEN SER ASINCRONOS
      console.log("Conexión exitosa a la base de datos");
    } catch (e) {
      console.error("Error al conectar con la base de datos:", e);
      mongoose.disconnect();
    }
  }
}

module.exports = Server;
