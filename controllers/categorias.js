const Categoria = require("../models/categorias");
const Solicitud = require("../models/solicitudes");
const Instructivo = require("../models/instructivos");

const getCategorias = async (req, res) => {
  try {
    res.status(200).json(await Categoria.find());
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const getCategoria = async (req, res) => {
  try {
    res.status(200).json(await Categoria.findById(req.params.id));
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

const createCategoria = async (req, res) => {
  try {
    const nuevaCategoria = new Categoria(req.body);
    const categoriaGuardada = await nuevaCategoria.save();
    res.status(201).json(categoriaGuardada);
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
  }
};

const updateCategoria = async (req, res) => {
  try {
    const id = req.params.id;

    const categoriaActualizada = await Categoria.findByIdAndUpdate(
      id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!categoriaActualizada) {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }

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
    res.status(500).json({ mensaje: e.message });
  }
};

const deleteCategoria = async (req, res) => {
  try {
    const id = req.params.id;

    const categoriaEliminada = await Categoria.findByIdAndDelete(id);

    if (!categoriaEliminada) {
      res.status(404).json({ mensaje: "Categoria no encontrada" });
    }

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
    res.status(500).json({ mensaje: e.message });
  }
};

module.exports = {
  getCategorias,
  getCategoria,
  createCategoria,
  updateCategoria,
  deleteCategoria,
};
