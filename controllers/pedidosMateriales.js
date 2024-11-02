const PedidosMateriales = require("../models/pedidosMateriales");
const Empleado = require("../models/empleados");
const Material = require("../models/materiales");

const getPedidos = async (req, res, next) => {
  try {
    res.status(200).json(await PedidosMateriales.find());
  } catch (e) {
    const error = new Error(
      "Hubo un error al obtener los pedidos de materiales"
    );
    error.statusCode = 404;
    next(e);
  }
};

const createPedido = async (req, res, next) => {
  try {
    const empleadoId = await Empleado.findById(req.body.empleado._id);

    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      const error = new Error("No se encontro el empleado");
      error.statusCode = 404;
      throw error;
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

    const nuevoPedidoMaterial = new PedidosMateriales(req.body);

    const pedidoMaterialGuardado = await nuevoPedidoMaterial.save();

    empleado.pedidosMateriales.push({
      _id: pedidoMaterialGuardado._id,
      descripcion: pedidoMaterialGuardado.descripcion,
      estado: pedidoMaterialGuardado.estado,
      fechaSolicitud: pedidoMaterialGuardado.createdAt,
    });

    await empleado.save();

    res.status(201).json(pedidoMaterialGuardado);
  } catch (e) {
    next(e);
  }
};

const getPedido = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pedidoMaterial = await PedidosMateriales.findById(id);

    if (!pedidoMaterial) {
      const error = new Error("No se encontro el pedido de materiales");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(pedidoMaterial);
  } catch (e) {
    next(e);
  }
};

const updatePedido = async (req, res, next) => {
  try {
    const id = req.params.id;

    //cambio de material
    const pedidoMaterialActualizado = await PedidosMateriales.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!pedidoMaterialActualizado) {
      const error = new Error("No se encontro el pedido de materiales");
      error.statusCode = 404;
      throw error;
    }

    await Empleado.updateOne(
      { "pedidosMateriales._id": id },
      {
        $set: {
          "pedidosMateriales.$.descripcion":
            pedidoMaterialActualizado.descripcion,
          "pedidosMateriales.$.estado": pedidoMaterialActualizado.estado,
        },
      }
    );

    res.status(200).json({
      mensaje: "Pedido actualizado exitosamente, Empleado actualizado",
      pedidoMaterialActualizado,
    });
  } catch (e) {
    next(e);
  }
};

const deletePedido = async (req, res, next) => {
  try {
    const id = req.params.id;

    const pedidoMaterialEliminado = await PedidosMateriales.findByIdAndDelete(
      id
    );

    if (!pedidoMaterialEliminado) {
      const error = new Error("No se encontro el pedido de materiales");
      error.statusCode = 404;
      throw error;
    }

    const empleadoPedidoEliminado = await Empleado.updateOne(
      { "pedidosMateriales._id": id },
      { $pull: { pedidosMateriales: { _id: id } } }
    );

    if (!empleadoPedidoEliminado) {
      const error = new Error("Pedido eliminado, Empleado no actualizado");
      error.statusCode = 404;
      throw error;
    }

    res
      .status(200)
      .json({ message: "Pedido eliminado, y empleado actualizado" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getPedidos,
  createPedido,
  getPedido,
  updatePedido,
  deletePedido,
};
