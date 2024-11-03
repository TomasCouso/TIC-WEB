const PedidosMateriales = require("../models/pedidosMateriales");
const Empleado = require("../models/empleados");
const Material = require("../models/materiales");
const { checkExists } = require("../helpers/errorHandler");

const getPedidos = async (req, res, next) => {
  try {
    const pedidos = await PedidosMateriales.find();
    checkExists(pedidos, "No se encontraron pedidos de materiales", 404);
    res.status(200).json(pedidos);
  } catch (e) {
    next(e);
  }
};

const createPedido = async (req, res, next) => {
  try {
    const empleadoId = await Empleado.findById(req.body.empleado._id);
    const empleado = await Empleado.findById(empleadoId);
    checkExists(empleado, "No se encontro el empleado", 404);

    const materialesValidos = await Promise.all(
      req.body.materiales.map(async (material) => {
        const materialEncontrado = await Material.findById(material._id);
        return materialEncontrado ? materialEncontrado : null;
      })
    );

    const materialesNoEncontrados = materialesValidos.filter(
      (material) => material === null
    );

    checkExists(materialesNoEncontrados.length === 0, "Algunos materiales no fueron encontrados", 404);

    // if (materialesNoEncontrados.length > 0) {
    //   return res.status(404).json({
    //     mensaje: "Algunos materiales no fueron encontrados",
    //     materialesNoEncontrados,
    //   });
    // }

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
    checkExists(pedidoMaterial, "No se encontro el pedido de materiales", 404);

    res.status(200).json(pedidoMaterial);
  } catch (e) {
    next(e);
  }
};

const updatePedido = async (req, res, next) => {
  try {
    const id = req.params.id;
    const pedidoMaterialActualizado = await PedidosMateriales.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    checkExists(pedidoMaterialActualizado, "No se encontro el pedido de materiales", 404);

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

    checkExists(pedidoMaterialEliminado, "No se encontro el pedido de materiales", 404);

    const empleadoPedidoEliminado = await Empleado.updateOne(
      { "pedidosMateriales._id": id },
      { $pull: { pedidosMateriales: { _id: id } } }
    );

    checkExists(empleadoPedidoEliminado, "Pedido eliminado, Empleado no actualizado", 404);

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
