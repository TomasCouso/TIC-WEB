const PedidosMateriales = require("../models/pedidosMateriales");
const Empleado = require("../models/empleados");

const getPedidos = async (req, res) => {
  try {
    res.status(200).json(await PedidosMateriales.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createPedido = async (req, res) => {
  try {
    const empleadoId = await Empleado.findById(req.user.id);

    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    const nuevoPedidoMaterial = new PedidosMateriales({
      ...req.body,
      empleado: {
        id: empleadoId,
        nombre: empleado.nombre,
      },
    });

    const pedidoMaterialGuardado = await nuevoPedidoMaterial.save();

    empleado.pedidosMateriales.push({
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
      {
        new: true,
        runValidators: true,
      }
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
        .json({ mensaje: "Pedido no encontrado o no se realizaron cambios" });
    }

    res.status(200).json({ mensaje: "Pedido actualizado exitosamente" });
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deletePedido = async (req, res) => {
  //agregar relacion con los empleados
  try {
    let id = req.params.id;
    const pedidoMaterialEliminado = await PedidosMateriales.findByIdAndDelete(
      id
    );
    if (pedidoMaterialEliminado) {
      res.status(200).json({ message: "Pedido de material eliminado" });
    } else {
      res.status(404).json({ message: "Pedido de material no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getPedidos,
  createPedido,
  getPedido,
  updatePedido,
  deletePedido,
};
