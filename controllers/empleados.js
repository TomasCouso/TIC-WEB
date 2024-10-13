const empleados = require("../models/empleados");

const getTodos = async (req, res) => {
  try {
    res.status(200).json(await empleados.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const crear = async (req, res) => {
  try {
    const nuevoEmpleado = new Empleado(req.body);
    const empleadoGuardado = await nuevoEmpleado.save();
    res.status(201).json(empleadoGuardado);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getPorId = async (req, res) => {
  try {
    let id = req.params.id;
    const empleado = await empleados.findById(id);
    if (empleado) {
      res.status(200).json(empleado);
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

const actualizarPorId = async (req, res) => {
  try {
    let id = req.params.id;
    const empleadoActualizado = await empleados.findByIdAndUpdate(
      id,
      req.body,
      {
        new: true,
      }
    );
    if (empleadoActualizado) {
      res.status(200).json(empleadoActualizado);
    } else {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const eliminarPorId = async (req, res) => {
  try {
    let id = req.params.id;
    const empleadoEliminado = await empleados.findByIdAndDelete(id);
    if (empleadoEliminado) {
      res.status(200).json({ message: "Empleado eliminado" });
    } else {
      res.status(404).json({ message: "Empleado no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

const verInfo = async (req, res) => {
  try {
    //el middleware tiene que poner al empeado en el user
    const empleadoId = req.user.id;
    const empleado = await empleados.findById(empleadoId);

    if (empleado) {
      res.status(200).json(empleado);
    } else {
      res.status(404).json({ mensaje: "Empleado no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ mensaje: e });
  }
};

module.exports = {
  getTodos,
  crear,
  getPorId,
  actualizarPorId,
  eliminarPorId,
  verInfo,
};
