const mongoose = require("mongoose");

const materialSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
      minlength: [3, "El nombre debe tener al menos 3 caracteres"],
      maxlength: [100, "El nombre no debe superar los 100 caracteres"],
    },
    cantidad: {
      type: Number,
      required: true,
      min: [0, "La cantidad no puede ser negativa"],
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
