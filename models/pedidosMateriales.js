const mongoose = require("mongoose");

const pedidoMaterialSchema = new mongoose.Schema(
  {
    materiales: [
      {
        id: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
          required: true,
        },
        nombre: {
          type: String,
          required: true,
        },
        cantidadSolicitada: {
          type: Number,
          required: true,
          min: [0, "La cantidad no puede ser negativa"],
        },
      },
    ],
    estado: {
      type: String,
      enum: ["pendiente", "en proceso", "completado", "cancelado"],
      default: "pendiente",
    },
    descripcion: {
      type: String,
      required: true,
    },
    empleado: {
      id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
        required: true,
      },
      nombre: {
        type: String,
        required: true,
      },
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
