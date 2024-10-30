const Instructivo = require("../models/instructivos");
const { checkExists } = require("../helpers/errorHandler");

const getInstructivos = async (req, res, next) => {
  let instructivos;

  try {
    if (req.user && (req.user.rol === "ADMIN" || req.user.rol === "EMPLEADO")) {
      instructivos = await Instructivo.find();
    } else {
      instructivos = await Instructivo.find({ soloEmpleados: false });
    }

    return res.status(200).json(instructivos);
  } catch (e) {
    next(e);
  }
};

const getInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instructivo = await Instructivo.findById(id);
    checkExists(instructivo, "No se encontro el instructivo", 404);

    res.status(200).json(instructivo);
  } catch (e) {
    next(e);
  }
};

const createInstructivo = async (req, res, next) => {
  try {
    const nuevoInstructivo = new Instructivo(req.body);
    const instructivoGuardado = await nuevoInstructivo.save();
    res.status(201).json(instructivoGuardado);
  } catch (e) {
    next(e);
  }
};

const updateInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instructivoActualizado = await Instructivo.findByIdAndUpdate(
      id, req.body, { new: true, runValidators: true }
    );
    checkExists(instructivoActualizado, "No se encontro el instructivo", 404);
    res.status(200).json(instructivoActualizado);
  } catch (e) {
    next(e);
  }
};

const deleteInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instructivoEliminado = await Instructivo.findByIdAndDelete(id);

    checkExists(instructivoEliminado, "No se encontro el instructivo", 404);
    res.status(200).json({ mensaje: "Instructivo eliminado" });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
};