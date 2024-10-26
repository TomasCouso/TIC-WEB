const Empleado = require("../models/empleados");
const PedidoMaterial = require("../models/pedidosMateriales");
const Solicitud = require("../models/solicitudes");

const getEmpleados = async (req, res) => {
  try {
    const empleados = await Empleado.find();

    if(!empleados){
      const error = new Error("No se encontraron empleados"); //PERSONALIZO ERROR
      error.statusCode = 404;
      throw error; //SALTO AL BLOQUE CATCH
    }
    
    res.status(200).json(empleados);
  } catch (e) {
    //res.status(500).json({ mensaje: e.message });
    next(e); //SALTO AL ERRORHANDLER
  }
};

const createEmpleado = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (e) {
    //res.status(500).json({ mensaje: e.message });
    next(e); //SALTO AL ERRORHANDLER
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
    res.status(500).json({ mensaje: e.message });
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
        { "empleado._id": id },
        { $set: { "empleado.nombre": empleadoActualizado.nombre } }
      );

      await Solicitud.updateMany(
        { "empleado._id": id },
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
    res.status(500).json({ message: e.message });
  }
};

const deleteEmpleado = async (req, res) => {
  try {
    const id = req.params.id;

    const empleadoEliminado = await Empleado.findByIdAndDelete(id);

    if (!empleadoEliminado) {
      res.status(404).json({ message: "Empleado no encontrado" });
    }

    await PedidoMaterial.deleteMany({ "empleado._id": id });

    await Solicitud.deleteMany({ "empleado._id": id });

    res.status(200).json({
      message: "Empleado eliminado, pedidos y solicitudes actualizadas",
    });
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
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

    const solicitudesPendientes = empleado.solicitudes.filter(
      (solicitud) => solicitud.estado === "pendiente"
    );

    res.status(200).json({
      empleado,
      pedidosPendientes,
      solicitudesPendientes,
    });
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
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
