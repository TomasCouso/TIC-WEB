const Noticia = require("../models/noticias");
const { checkExists } = require("../helpers/errorHandler");

const getNoticias = async (req, res, next) => {
  try {
    const noticias = await Noticia.find();
    res.status(200).json(noticias);
  } catch (e) {
    next(e);
  }
};

const getNoticia = async (req, res, next) => {
  try {
    const noticia = await Noticia.findById(req.params.id);
    checkExists(noticia, "No se encontro la noticia", 404);
    res.status(200).json(noticia);
  } catch (e) {
    next(e);
  }
};

const createNoticia = async (req, res, next) => {
  try {
    const nuevaNoticia = new Noticia(req.body);
    const noticiaGuardada = await nuevaNoticia.save();
    res.status(201).json(noticiaGuardada);
  } catch (e) {
    next(e);
  }
};

const updateNoticia = async (req, res, next) => {
  try {
    const noticiaActualizada = await Noticia.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    checkExists(
      noticiaActualizada,
      "Hubo un error al actualizar la noticia",
      404
    );

    res.status(200).json(noticiaActualizada);
  } catch (e) {
    next(e);
  }
};

const deleteNoticia = async (req, res, next) => {
  try {
    const noticiaEliminada = await Noticia.findByIdAndDelete(req.params.id);
    checkExists(noticiaEliminada, "No se encontro la noticia a eliminar", 404);
    res.status(200).json({ mensaje: "Noticia eliminada" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
};
