const PedidosMateriales = require("../models/pedidosMateriales");
const Empleado = require("../models/empleados");
const Material = require("../models/materiales");

const getPedidos = async (req, res) => {
  try {
    res
      .status(200)
      .json(await PedidosMateriales.find())
      .toJSON();
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createPedido = async (req, res) => {
  try {
    const empleadoId = await Empleado.findById(req.body.empleadoId);

    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    const materialesValidos = await Promise.all(
      req.body.materiales.map(async (material) => {
        const materialEncontrado = await Material.findById(material._id);
        return materialEncontrado ? materialEncontrado : null;
      })
    );

    const materialesNoEncontrados = materialesValidos.filter(
      (material) => material === null
    );
    if (materialesNoEncontrados.length > 0) {
      return res.status(404).json({
        mensaje: "Algunos materiales no fueron encontrados",
        materialesNoEncontrados,
      });
    }

    const nuevoPedidoMaterial = new PedidosMateriales({
      ...req.body,
      empleado: {
        _id: empleadoId,
        nombre: empleado.nombre,
      },
    });

    const pedidoMaterialGuardado = await nuevoPedidoMaterial.save();

    empleado.pedidosMateriales.push({
      _id: pedidoMaterialGuardado._id,
      descripcion: pedidoMaterialGuardado.descripcion,
      estado: pedidoMaterialGuardado.estado,
      fechaSolicitud: pedidoMaterialGuardado.fechaSolicitud,
    });

    await empleado.save();

    res.status(201).json(pedidoMaterialGuardado);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getPedido = async (req, res) => {
  try {
    const id = req.params.id;
    const pedidoMaterial = await PedidosMateriales.findById(id);
    if (pedidoMaterial) {
      res.status(200).json(pedidoMaterial);
    } else {
      res.status(404).json({
        id,
        encontrado: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const updatePedido = async (req, res) => {
  try {
    const id = req.params.id;

    const pedidoMaterialActualizado = await PedidosMateriales.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pedidoMaterialActualizado) {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }

    const pedidoEmpleadoActualizado = await Empleado.updateOne(
      { "pedidosMateriales._id": id },
      {
        $set: {
          "pedidosMateriales.$.descripcion":
            pedidoMaterialActualizado.descripcion,
          "pedidosMateriales.$.estado": pedidoMaterialActualizado.estado,
          "pedidosMateriales.$.fechaSolicitud":
            pedidoMaterialActualizado.fechaSolicitud,
        },
      }
    );

    if (pedidoEmpleadoActualizado.modifiedCount === 0) {
      res
        .status(404)
        .json({ mensaje: "Pedido no encontrado o no se realizaron cambios en Empleado" });
    }

    res.status(200).json({ mensaje: "Pedido actualizado exitosamente, Empleado actualizado" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deletePedido = async (req, res) => {
  try {
    const id = req.params.id;

    const pedidoMaterialEliminado = await PedidosMateriales.findByIdAndDelete(
      id
    );

    if (!pedidoMaterialEliminado) {
      res.status(404).json({ message: "Pedido de material no encontrado" });
    }

    const EmpleadoPedidoEliminado = await Empleado.updateOne(
      { "pedidosMateriales._id": id },
      { $pull: { pedidosMateriales: { _id: id } } }
    );

    if (!EmpleadoPedidoEliminado) {
      res
        .status(404)
        .json({ message: "Pedido eliminado, Empleado no actualizado" });
    }

    res
      .status(200)
      .json({ message: "Pedido eliminado, y empleado actualizado" });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getPedidos,
  createPedido,
  getPedido,
  updatePedido,
  deletePedido,
};
