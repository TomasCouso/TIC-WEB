const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    cantidad: {
      type: Number,
      required: true,
    },
    proveedor: {
      type: String,
      required: false,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "materiales",
    timestamps: true,
  }
);

const Material = mongoose.model("Material", materialSchema);

module.exports = Material;
