const Noticia = require("../models/noticias");

const getNoticias = async (req, res) => {
  try {
    res.status(200).json(await Noticia.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getNoticia = async (req, res) => {
  try {
    const id = req.params.id;
    const noticia = await Noticia.findById(id);
    if (noticia) {
      res.status(200).json(noticia);
    } else {
      res.status(404).json({
        id,
        encontrado: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createNoticia = async (req, res) => {
  try {
    const nuevaNoticia = new Noticia(req.body);
    const noticiaGuardada = await nuevaNoticia.save();
    res.status(201).json(noticiaGuardada);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const updateNoticia = async (req, res) => {
  try {
    const id = req.params.id;
    const noticiaActualizada = await Noticia.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    if (noticiaActualizada) {
      res.status(200).json(noticiaActualizada);
    } else {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

const deleteNoticia = async (req, res) => {
  try {
    const id = req.params.id;
    const noticiaEliminada = await Noticia.findByIdAndDelete(id);
    if (noticiaEliminada) {
      res.status(200).json({ mensaje: "Noticia eliminada" });
    } else {
      res.status(404).json({ mensaje: "Noticia no encontrada" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

module.exports = {
  getNoticias,
  getNoticia,
  createNoticia,
  updateNoticia,
  deleteNoticia,
};
