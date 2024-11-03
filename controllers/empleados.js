const Empleado = require("../models/empleados");
const PedidoMaterial = require("../models/pedidosMateriales");
const Solicitud = require("../models/solicitudes");
const { checkExists } = require("../helpers/errorHandler");

const getEmpleados = async (req, res, next) => {
  try {
    const empleados = await Empleado.find();
    checkExists(empleados, "No se encontraron empleados", 404);

    res.status(200).json(empleados);
  } catch (e) {
    next(e); //SALTO AL ERRORHANDLER
  }
};

const createEmpleado = async (req, res, next) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    checkExists(nuevoEmpleado.nombre, "No se encontro el nombre del empleado", 404);

    res.status(201).json(empleadoGuardado);
  } catch (e) {
    next(e); //SALTO AL ERRORHANDLER
  }
};

const getEmpleado = async (req, res, next) => {
  try {
    const empleado = await Empleado.findById(req.params.id);
    checkExists(empleado, "No se encontro el empleado", 404);
    res.status(200).json(empleado);
  } catch (e) {
    next(e);
  }
};

const updateEmpleado = async (req, res, next) => {
  try {
    const id = req.params.id;
    const empleadoAnterior = await Empleado.findById(id);
    checkExists(empleadoAnterior, "No se encontro el empleado", 404);

    const empleadoActualizado = await Empleado.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (empleadoActualizado && empleadoAnterior.nombre !== empleadoActualizado.nombre) {
      await PedidoMaterial.updateMany(
        { "empleado._id": id },
        { $set: { "empleado.nombre": empleadoActualizado.nombre } }
      );

      await Solicitud.updateMany(
        { "empleado._id": id },
        { $set: { "empleado.nombre": empleadoActualizado.nombre } }
      );
    }

    checkExists(empleadoActualizado, "No se encontro el empleado", 404);
    res.status(200).json(empleadoActualizado);
  } catch (e) {
    next(e);
  }
};

const deleteEmpleado = async (req, res, next) => {
  try {
    const id = req.params.id;
    const empleadoEliminado = await Empleado.findByIdAndDelete(id);
    checkExists(empleadoEliminado, "No se encontro el empleado", 404);

    await PedidoMaterial.deleteMany({ "empleado._id": id });
    await Solicitud.deleteMany({ "empleado._id": id });

    res.status(200).json({
      message: "Empleado eliminado, pedidos y solicitudes actualizadas",
    });
  } catch (e) {
    next(e);
  }
};

const getInfoEmpleado = async (req, res, next) => {
  try {
    const empleado = await Empleado.findById(req.usuario.id);
    checkExists(empleado, "No se encontro el empleado", 404);
    
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
    next(e);
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
