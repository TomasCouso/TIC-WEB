const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

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
    },
    password: {
      type: String,
      required: true,
    },
    rol: {
      type: String,
      enum: ["admin", "empleado"],
      default: "empleado",
    },
    activo: {
      type: Boolean,
      default: true,
    },
    fechaIngreso: {
      type: Date,
      default: Date.now,
    },
  },
  {
    collection: "empleados",
    timestamps: true,
  }
);

empleadoSchema.pre("save", async function (next) {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(this.password, salt);
      this.password = hashedPassword;
    }
    next();
  } catch (error) {
    return next(error);
  }
});

empleadoSchema.methods.comparePassword = async function (candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

const Empleado = mongoose.model("Empleado", empleadoSchema);

module.exports = Empleado;
