const mongoose = require("mongoose");

const empleadoSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Email inválido",
      ],
    },
    telefono: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "becario"],
      default: "becario",
    },
    lastLogin: {
      type: Date,
    },
    pedidosMateriales: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "PedidoMaterial",
          required: true,
        },
        descripcion: String,
        estado: String,
        fechaSolicitud: Date,
      },
    ],
    solicitudes: [
      {
        _id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Solicitud",
          required: true,
        },
        asunto: String,
        emailSolicitante: String,
        fechaSolicitud: Date,
        estado: String,
      },
    ],
  },
  {
    collection: "empleados",
    timestamps: true,
  }
);

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
