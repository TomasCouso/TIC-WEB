const Instructivo = require("../models/instructivos");

const getInstructivos = async (req, res) => {
  let instructivos; //CREO UNA VARIABLE PARA GUARDAR LOS INSTRUCTIVOS PARA QUE SI NECESITAMOS CAMBIAR ALGO SEA MAS FACIL DESPUES

  try {
    if (req.user && (req.user.rol === "ADMIN" || req.user.rol === "EMPLEADO")) {
      instructivos = await Instructivo.find(); //DEVUELVO TODOS LOS INSTRUCTIVOS
    } else {
      instructivos = await Instructivo.find({ soloEmpleados: false }); //DEVUELVO SOLO LOS INSTRUCTIVOS QUE NO SON PARA EMPLEADOS
    }

    return res.status(200).json(instructivos);
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
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
    res.status(500).json({ mensaje: e.message });
  }
};

const createInstructivo = async (req, res) => {
  try {
    const nuevoInstructivo = new Instructivo(req.body);
    const instructivoGuardado = await nuevoInstructivo.save();
    res.status(201).json(instructivoGuardado);
  } catch (e) {
    res.status(500).json({ mensaje: e.message });
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
        runValidators: true,
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
    res.status(500).json({ mensaje: e.message });
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
    res.status(500).json({ mensaje: e.message });
  }
};

module.exports = {
  getInstructivos,
  getInstructivo,
  createInstructivo,
  updateInstructivo,
  deleteInstructivo,
};
