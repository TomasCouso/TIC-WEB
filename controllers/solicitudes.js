const Solicitud = require("../models/solicitudes");
const Empleado = require("../models/empleados");
const Categoria = require("../models/categorias");

const getSolicitudes = async (req, res) => {
  try {
    res.status(200).json(await Solicitud.find());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getSolicitud = async (req, res) => {
  try {
    const id = req.params.id;
    const solicitud = await Solicitud.findById(id);
    if (solicitud) {
      res.status(200).json(solicitud);
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

const createSolicitud = async (req, res) => {
  try {
    const empleadoId = await Empleado.findById(req.body.empleadoID);

    const empleado = await Empleado.findById(empleadoId);
    if (!empleado) {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }

    const categoriaId = await Categoria.findById(req.body.categoriaID);
    const categoria = await Categoria.findById(categoriaId);
    if (!categoria) {
      res.status(404).json({ mensaje: "Categoria no encontrada" });
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
      fechaSolicitud: solicitudGuardada.createdAt,
    });

    await empleado.save();

    res.status(201).json(solicitudGuardada);
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};

const updateSolicitud = async (req, res) => {
  try {
    const id = req.params.id;

    const solicitudActualizada = await Solicitud.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!solicitudActualizada) {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }

    const empleadoSolicitudActualizada = await Empleado.updateOne(
      { "solicitudes._id": id },
      {
        $set: {
          "solicitudes.$.asunto": solicitudActualizada.asunto,
          "solicitudes.$.emailSolicitante":
            solicitudActualizada.emailSolicitante,
        },
      }
    );

    if (empleadoSolicitudActualizada.modifiedCount === 0) {
      res.status(404).json({
        mensaje:
          "Solicitud no encontrada o no se realizaron cambios en Empleado",
      });
    }

    res.status(200).json({
      mensaje: "Solicitud actualizado exitosamente, Empleado actualizado", solicitudActualizada
    });
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};

const deleteSolicitud = async (req, res) => {
  try {
    const id = req.params.id;
    const solicitudEliminada = await Solicitud.findByIdAndDelete(id);
    if (solicitudEliminada) {
      res.status(200).json({ mensaje: "Solicitud eliminada" });
    } else {
      res.status(404).json({ mensaje: "Solicitud no encontrada" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};

module.exports = {
  getSolicitudes,
  getSolicitud,
  createSolicitud,
  updateSolicitud,
  deleteSolicitud,
};
