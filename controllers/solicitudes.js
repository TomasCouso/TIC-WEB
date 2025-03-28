const Solicitud = require("../models/solicitudes");
const Empleado = require("../models/empleados");
const Categoria = require("../models/categorias");
const { checkExists } = require("../helpers/errorHandler");

const getForm = async (req, res, next) => {
  try {
    const categorias = await Categoria.find();
    res.status(200).json(categorias);
  } catch (e) {
    next(e);
  }
};

const getSolicitudes = async (req, res, next) => {
  try {
    const solicitudes = await Solicitud.find();
    res.status(200).json(solicitudes);
  } catch (e) {
    next(e);
  }
};

const getSolicitud = async (req, res, next) => {
  try {
    const solicitud = await Solicitud.findById(req.params.id);
    checkExists(solicitud, "No se encontro la solicitud", 404);
    res.status(200).json(solicitud);
  } catch (e) {
    next(e);
  }
};

const createSolicitud = async (req, res, next) => {
  try {
    const empleado = await Empleado.findById(req.body.empleado._id);
    if (!empleado) {
      return res.status(404).json({ mensaje: "No se encontró el empleado" });
    }

    const categoria = await Categoria.findById(req.body.categoria._id);
    if (!categoria) {
      return res.status(404).json({ mensaje: "No se encontró la categoría" });
    }

    const nuevaSolicitud = new Solicitud(req.body);
    const solicitudGuardada = await nuevaSolicitud.save();

    empleado.solicitudes.push({
      _id: solicitudGuardada._id,
      asunto: solicitudGuardada.asunto,
      emailSolicitante: solicitudGuardada.emailSolicitante,
      estado: solicitudGuardada.estado,
      fechaSolicitud: solicitudGuardada.createdAt,
    });

    await empleado.save();
    res.status(201).json(solicitudGuardada);
  } catch (e) {
    next(e);
  }
};

const updateSolicitud = async (req, res, next) => {
  try {
    const id = req.params.id;
    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!solicitudActualizada) {
      return res.status(404).json({ mensaje: "No se encontró la solicitud" });
    }

    await Empleado.updateOne(
      { "solicitudes._id": id },
      {
        $set: {
          "solicitudes.$.asunto": solicitudActualizada.asunto,
          "solicitudes.$.estado": solicitudActualizada.estado,
          "solicitudes.$.emailSolicitante":
            solicitudActualizada.emailSolicitante,
        },
      }
    );

    res.status(200).json({
      mensaje: "Solicitud actualizada exitosamente, Empleado actualizado",
      solicitudActualizada,
    });
  } catch (e) {
    next(e);
  }
};

const deleteSolicitud = async (req, res, next) => {
  try {
    const id = req.params.id;
    const solicitudEliminada = await Solicitud.findByIdAndDelete(id);

    checkExists(solicitudEliminada, "No se encontro la solicitud", 404);

    await Empleado.updateOne(
      { "solicitudes._id": id },
      { $pull: { solicitudes: { _id: id } } }
    );

    res
      .status(200)
      .json({ mensaje: "Solicitud eliminada, y Empleado actualizado" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getForm,
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
};
