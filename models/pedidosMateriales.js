const mongoose = require("mongoose");

const pedidoMaterialSchema = new mongoose.Schema(
  {
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: true,
    },
    cantidadSolicitada: {
      type: Number,
      required: true,
    },
    estado: {
      type: String,
      enum: ["pendiente", "en proceso", "completado", "cancelado"],
      default: "pendiente",
    },
    empleado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
    },
    fechaSolicitud: {
      type: Date,
      default: Date.now,
    },
    fechaActualizacion: {
      type: Date,
    },
  },
  {
    collection: "pedidosMateriales",
    timestamps: true,
  }
);

const PedidoMaterial = mongoose.model("PedidoMaterial", pedidoMaterialSchema);

module.exports = PedidoMaterial;
