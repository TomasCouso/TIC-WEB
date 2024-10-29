const Instructivo = require("../models/instructivos");

const getInstructivos = async (req, res, next) => {
  let instructivos; //CREO UNA VARIABLE PARA GUARDAR LOS INSTRUCTIVOS PARA QUE SI NECESITAMOS CAMBIAR ALGO SEA MAS FACIL DESPUES

  try {
    if (req.user && (req.user.rol === "ADMIN" || req.user.rol === "EMPLEADO")) {
      instructivos = await Instructivo.find(); //DEVUELVO TODOS LOS INSTRUCTIVOS
    } else {
      instructivos = await Instructivo.find({ soloEmpleados: false }); //DEVUELVO SOLO LOS INSTRUCTIVOS QUE NO SON PARA EMPLEADOS
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
    if (instructivo) {
      res.status(200).json(instructivo);
    } else {
      const error = new Error("No se encontro el instructivo");
      error.statusCode = 404;
      throw error;
    }
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
      id,
      req.body, {
      new: true, runValidators: true,
    }
    );

    if (!instructivoActualizado) {
      const error = new Error("No se encontro el instructivo");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(instructivoActualizado);
  } catch (e) {
    next(e);
  }
};

const deleteInstructivo = async (req, res, next) => {
  try {
    const id = req.params.id;
    const instructivoEliminado = await Instructivo.findByIdAndDelete(id);
    
    if (instructivoEliminado) {
      res.status(200).json({ mensaje: "Instructivo eliminado" });
    } else {
      const error = new Error("No se encontro el instructivo");
      error.statusCode = 404;
      throw error;
    }
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
