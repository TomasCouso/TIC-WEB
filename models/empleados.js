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
      match: [
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        "Email inválido",
      ],
    },
    telefono: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      trim: true,
    },
    rol: {
      type: String,
      enum: ["admin", "empleado"],
      default: "empleado",
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

empleadoSchema.pre("findOneAndUpdate", async function (next) {
  try {
    const update = this.getUpdate();
    if (update.password) {
      const salt = await bcrypt.genSalt(10);
      update.password = await bcrypt.hash(update.password, salt);
      this.setUpdate(update);
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
