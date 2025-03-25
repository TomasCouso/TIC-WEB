const Empleado = require("../models/empleados");
const PedidoMaterial = require("../models/pedidosMateriales");
const Solicitud = require("../models/solicitudes");
const { checkExists } = require("../helpers/errorHandler");

const getEmpleados = async (req, res, next) => {
  try {
    const empleados = await Empleado.find();
    res.status(200).json(empleados);
  } catch (e) {
    next(e);
  }
};

const existeAdmin = async (req, res) => {
  try {
    const administradores = await Empleado.find({ rol: "admin" });
    res.json({ hayAdmin: administradores.length > 0 });
  } catch (e) {
    next(e);
  }
};


const createEmpleado = async (req, res, next) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (e) {
    next(e);
  }
};

const createEmpleadoAdmin = async (req, res, next) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (e) {
    next(e);
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
    checkExists(empleadoActualizado, "No se encontro el empleado", 404);

    if (empleadoAnterior.nombre !== empleadoActualizado.nombre) {
      await PedidoMaterial.updateMany(
        { "empleado._id": id },
        { $set: { "empleado.nombre": empleadoActualizado.nombre } }
      );

      await Solicitud.updateMany(
        { "empleado._id": id },
        { $set: { "empleado.nombre": empleadoActualizado.nombre } }
      );
    }

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

    const pedidosPendientes = empleado.pedidosMateriales
      .sort((a, b) => new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud))
      .slice(0, 3);

    const solicitudesPendientes = empleado.solicitudes
      .sort((a, b) => new Date(b.fechaSolicitud) - new Date(a.fechaSolicitud))
      .slice(0, 3);

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
  existeAdmin,
  createEmpleado,
  createEmpleadoAdmin,
  getEmpleado,
  updateEmpleado,
  deleteEmpleado,
  getInfoEmpleado,
};
