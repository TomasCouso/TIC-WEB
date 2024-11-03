const Noticia = require("../models/noticias");
const { checkExists } = require("../helpers/errorHandler");

const getNoticias = async (req, res, next) => {
  try {
    const noticias = await Noticia.find();

    checkExists(noticias, "No se encontraron noticias", 404);
    res.status(200).json(noticias);
  } catch (e) {
    next(e);
  }
};

const getNoticia = async (req, res, next) => {
  try {
    const id = req.params.id;
    const noticia = await Noticia.findById(id);

    checkExists(noticia, "No se encontro la noticia", 404);

    res.status(200).json(noticia);
  } catch (e) {
    next(e);
  }
};

const createNoticia = async (req, res, next) => {
  try {
    const nuevaNoticia = new Noticia(req.body);
    checkExists(nuevaNoticia, "Hubo un error al crear la noticia", 404);

    const noticiaGuardada = await nuevaNoticia.save();
    checkExists(noticiaGuardada, "Hubo un error al guardar la noticia", 404);

    res.status(201).json(noticiaGuardada);
  } catch (e) {
    next(e);
  }
};

const updateNoticia = async (req, res, next) => {
  try {
    const id = req.params.id;
    const noticiaActualizada = await Noticia.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    checkExists(noticiaActualizada, "Hubo un error al actualizar la noticia", 404);
    
    res.status(200).json(noticiaActualizada);
  } catch (e) {
    next(e);
  }
};

const deleteNoticia = async (req, res, next) => {
  try {
    const id = req.params.id;
    const noticiaEliminada = await Noticia.findByIdAndDelete(id);

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
