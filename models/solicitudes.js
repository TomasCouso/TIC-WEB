const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema(
  {
    emailSolicitante: {
      type: String,
      required: true,
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email inválido",
      ],
    },
    asunto: {
      type: String,
      required: true,
    },
    texto: {
      type: String,
      required: true,
    },
    categoria: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Categoria",
        required: true,
      },
      nombre: String,
    },
    empleado: {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
    },
    estado: {
      type: String,
      enum: ["pendiente", "en proceso", "completado", "cancelado"],
      default: "pendiente",
    },
  },
  {
    collection: "solicitudes",
    timestamps: true,
  }
);

const Solicitud = mongoose.model("Solicitud", solicitudSchema);

module.exports = Solicitud;
