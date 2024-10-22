const mongoose = require("mongoose");

const instructivoSchema = new mongoose.Schema(
  {
    titulo: {
      type: String,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
    contenido: {
      type: String, //URL DEL ACHIVO
      required: true,
    },
    fechaCreacion: {
      type: Date,
      default: Date.now,
    },
    autor: {
      type: String,
      required: true,
    },
    soloEmpleados: { //AGREGO BOOLEAN PARA UTILIZARLO EN LAS SOLICITUDES DE INSTRUCTIVOS TANTO DESDE CLIENTE COMO DE EMPLEADOS
      type: Boolean,
      required: false,
      default: false,
    }

  },
  {
    collection: "instructivos",
    timestamps: true,
  }
);

const Instructivo = mongoose.model("Instructivo", instructivoSchema);

module.exports = Instructivo;
