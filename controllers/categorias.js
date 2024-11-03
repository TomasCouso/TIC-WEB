const Categoria = require("../models/categorias");
const Solicitud = require("../models/solicitudes");
const Instructivo = require("../models/instructivos");
const { checkExists } = require("../helpers/errorHandler");

const getCategorias = async (req, res, next) => {
  try {
    res.status(200).json(await Categoria.find());
  } catch (e) {
    next(e);
  }
};

const getCategoria = async (req, res, next) => {
  try {
    res.status(200).json(await Categoria.findById(req.params.id));
  } catch (e) {
    next(e);
  }
};

const createCategoria = async (req, res, next) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json(categoriaGuardada);

  } catch (e) {
    next(e);
  }
};

const updateCategoria = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    checkExists(categoriaActualizada, "No se encontro la categoria", 404);

    await Solicitud.updateMany(
      { "categoria._id": id },
      {
        $set: {
          "categoria.nombre": categoriaActualizada.nombre,
        },
      }
    );

    await Instructivo.updateMany(
      { "categoria._id": id },
      {
        $set: {
          "categoria.nombre": categoriaActualizada.nombre,
        },
      }
    );

    res.status(200).json({
      mensaje: "Categoria actualizada exitosamente ",
      categoriaActualizada,
    });
  } catch (e) {
    next(e);
  }
};

const deleteCategoria = async (req, res, next) => {
  try {
    const id = req.params.id;
    const categoriaEliminada = await Categoria.findByIdAndDelete(id);
    checkExists(categoriaEliminada, "Categoria no encontrada", 404);

    await Solicitud.updateMany(
      { "categoria._id": id },
      {
        $set: {
          "categoria.nombre": `${categoriaEliminada.nombre} (categoria eliminada)`,
          estado: "cancelada",
        },
      }
    );

    await Instructivo.updateMany(
      { "categoria._id": id },
      {
        $set: {
          "categoria.nombre": `${categoriaEliminada.nombre} (categoria eliminada)`,
        },
      }
    );

    res.status(200).json({
      mensaje: "Categoria eliminada, y Solicitud actualizada",
      categoriaEliminada,
    });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
