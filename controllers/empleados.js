const Empleado = require("../models/empleados");
const PedidoMaterial = require("../models/pedidosMateriales");

const getEmpleados = async (req, res) => {
  try {
    res.status(200).json(await Empleado.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getEmpleado = async (req, res) => {
  try {
    let id = req.params.id;
    const empleado = await Empleado.findById(id);
    if (empleado) {
      res.status(200).json(empleado);
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

const updateEmpleado = async (req, res) => {
  try {
    const id = req.params.id;

    const empleadoAnterior = await Empleado.findById(id);
    if (!empleadoAnterior) {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (
      empleadoActualizado &&
      empleadoAnterior.nombre !== empleadoActualizado.nombre
    ) {
      await PedidoMaterial.updateMany(
        { "empleado.id": id },
        { $set: { "empleado.nombre": empleadoActualizado.nombre } }
      );
    }

    if (empleadoActualizado) {
      res.status(200).json(empleadoActualizado);
    } else {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    //agregar relacion con los pedidos
    const id = req.params.id;
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);
    if (empleadoEliminado) {
      res.status(200).json({ message: "Empleado eliminado" });
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

const getInfoEmpleado = async (req, res) => {
  try {
    //el middleware tiene que poner al empeado en el user
    const empleadoId = req.user.id;
    const empleado = await Empleado.findById(empleadoId);

    if (!empleado) {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    const pedidosPendientes = empleado.pedidosMateriales.filter(
      (pedido) => pedido.estado === "pendiente"
    );

    //solicitudes a nombre del empleado

    res.status(200).json({
      empleado,
      pedidosPendientes,
      //solicitudes,
    });
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

module.exports = {
  getEmpleados,
  createEmpleado,
  getEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getInfoEmpleado,
};
