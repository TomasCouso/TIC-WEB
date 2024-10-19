const Instructivo = require("../models/instructivo");

const getInstructivos = async (req, res) => {
  try {
    res.status(200).json(await Instructivo.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getInstructivo = async (req, res) => {
  try {
    const id = req.params.id;
    const instructivo = await Instructivo.findById(id);
    if (instructivo) {
      res.status(200).json(instructivo);
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

const createInstructivo = async (req, res) => {
  try {
    const nuevoInstructivo = new Instructivo(req.body);
    const instructivoGuardado = await nuevoInstructivo.save();
    res.status(201).json(instructivoGuardado);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const updateInstructivo = async (req, res) => {
  try {
    const id = req.params.id;
    const instructivoActualizado = await Instructivo.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (instructivoActualizado) {
      res.status(200).json(instructivoActualizado);
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

const deleteInstructivo = async (req, res) => {
  try {
    const id = req.params.id;
    const instructivoEliminado = await Instructivo.findByIdAndDelete(id);
    if (instructivoEliminado) {
      res.status(200).json({ mensaje: "Instructivo eliminado" });
    } else {
      res.status(404).json({ mensaje: "Instructivo no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

module.exports = {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
};
