const mongoose = require("mongoose");

const maquinaSchema = new mongoose.Schema(
  {
    oficina: {
      type: String,
      required: true,
    },
    nombre: {
      type: String,
      required: true,
    },
    procesador: {
      type: String,
      required: true,
    },
    memoriaRAM: {
      type: Number,
      required: true,
    },
    tarjetaGrafica: {
      type: String,
      enum: ["NVIDIA", "AMD", "INTEL", "OTHER"],
      required: true,
    },
    motherboard: {
      type: String,
      required: true,
    },
    tamanhoDiscoSSD: {
      type: Number,
      required: true,
    },
    tamanhoDiscoHDD: {
      type: Number,
      required: true,
    },
    fechaUltimoMantenimiento: {
      type: Date,
      default: Date.now,
    },
    empleadoResponsableMantenimiento: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Empleado",
      required: true,
    },
  },
  {
    collection: "maquinas",
    timestamps: true,
  }
);

const Maquina = mongoose.model("Maquina", maquinaSchema);

module.exports = Maquina;
