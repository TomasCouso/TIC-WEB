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
      min: [1, "La cantidad solicitada debe ser mayor a cero"],
    },
    estado: {
      type: String,
      enum: ["pendiente", "en proceso", "completado", "cancelado"],
      default: "pendiente",
      index: true, 
    },
    empleado: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
      index: true,
    },
    fechaSolicitud: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "pedidosMateriales",
    timestamps: true,
  }
);

const PedidoMaterial = mongoose.model("PedidoMaterial", pedidoMaterialSchema);

module.exports = PedidoMaterial;
