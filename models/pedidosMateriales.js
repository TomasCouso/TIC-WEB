const mongoose = require("mongoose");
const Empleado = require("./empleados");

const pedidoMaterialSchema = new mongoose.Schema(
  {
    materiales: [
      {
        _id: {
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
  },
  {
    collection: "pedidosMateriales",
    timestamps: true,
  }
);

pedidoMaterialSchema.pre("updateMany", async function (next) {
  const update = this.getUpdate();

  const estado = update.$set?.estado;

  if (estado !== "cancelado") {
    return next();
  }

  const filter = this.getFilter();

  try {
    const pedidos = await PedidoMaterial.find(filter);

    await Promise.all(
      pedidos.map(async (pedido) => {
        return await Empleado.updateOne(
          { "pedidosMateriales._id": pedido._id },
          {
            $set: {
              "pedidosMateriales.$.estado": "cancelado",
            },
          }
        );
      })
    );

    next();
  } catch (error) {
    next(error);
  }
});

const PedidoMaterial = mongoose.model("PedidoMaterial", pedidoMaterialSchema);

module.exports = PedidoMaterial;
