const Noticia = require("../models/noticias");

const getNoticias = async (req, res, next) => {
  try {
    const noticias = await Noticia.find();

    if (!noticias) {
      const error = new Error("No se encontraron noticias");
      error.statusCode = 404;
      throw error;
    }
    
    res.status(200).json(noticias);
  } catch (e) {
    next(e);
  }
};

const getNoticia = async (req, res, next) => {
  try {
    const id = req.params.id;
    const noticia = await Noticia.findById(id);

    if (!noticia) {
      const error = new Error("No se encontro la noticia");
      error.statusCode = 404;
      throw error;
    } 

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
    const error = new Error("Hubo un error al crear la noticia");
    error.statusCode = 404;
    next(e);
  }
};

const updateNoticia = async (req, res, next) => {
  try {
    const id = req.params.id;
    const noticiaActualizada = await Noticia.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    if (!noticiaActualizada) {
      const error = new Error("Hubo un error al actualizar la noticia");
      error.statusCode = 404;
      throw error;
    } 
  
    res.status(200).json(noticiaActualizada);
  } catch (e) {
    next(e);
  }
};

const deleteNoticia = async (req, res, next) => {
  try {
    const id = req.params.id;
    const noticiaEliminada = await Noticia.findByIdAndDelete(id);

    if (!noticiaEliminada) {
      const error = new Error("No se encontro la noticia a eliminar");
      error.statusCode = 404;
      throw error;
    }

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
