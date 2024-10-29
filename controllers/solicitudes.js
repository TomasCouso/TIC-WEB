const Solicitud = require("../models/solicitudes");
const Empleado = require("../models/empleados");
const Categoria = require("../models/categorias");

const getForm = async (req, res, next) => {
  try {
    const categorias = await Categoria.find();
    
    if (!categorias) {
      const error = new Error("No se encontraron categorias");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      categorias,
    });
  } catch (error) {
    next(error);
  }
};

const getSolicitudes = async (req, res, next) => {
  try {
    res.status(200).json(await Solicitud.find());
  } catch (e) {
    next(e);
  }
};

const getSolicitud = async (req, res, next) => {
  try {
    const id = req.params.id;
    const solicitud = await Solicitud.findById(id);

    if (!solicitud) {
      const error = new Error("No se encontro la solicitud");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(solicitud);
  } catch (e) {
    next(e);
  }
};

const createSolicitud = async (req, res, next) => {
  try {
    //id mesa de ayuda en el req, harcodear, despues del reasignar
    const empleado = await Empleado.findById(req.body.empleadoID);
    
    if (!empleado) {
      const error = new Error("No se encontro el empleado");
      error.statusCode = 404;
      throw error;
    }

    const categoriaId = await Categoria.findById(req.body.categoriaID);
    const categoria = await Categoria.findById(categoriaId);

    if (!categoria) {
      const error = new Error("No se encontro la categoria");
      error.statusCode = 404;
      throw error;
    }

    const nuevaSolicitud = new Solicitud({
      ...req.body,
      empleado: {
        _id: empleadoId,
        nombre: empleado.nombre,
      },
      categoria: {
        _id: categoriaId,
        nombre: categoria.nombre,
      },
    });

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

    //cambio de categoria
    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!solicitudActualizada) {
      const error = new Error("No se encontro la solicitud");
      error.statusCode = 404;
      throw error;
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
      mensaje: "Solicitud actualizado exitosamente, Empleado actualizado",
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

    if (!solicitudEliminada) {
      const error = new Error("No se encontro la solicitud");
      error.statusCode = 404;
      throw error;
    }

    const empleadoSolicitudEliminada = await Empleado.updateOne(
      { "solicitudes._id": id },
      { $pull: { solicitudes: { _id: id } } }
    );

    if (!empleadoSolicitudEliminada) {
      const error = new Error("Solicitud eliminada, Empleado no actualizado");
      error.statusCode = 404;
      throw error;
    }

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
