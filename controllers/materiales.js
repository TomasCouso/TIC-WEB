
const materialesModel = require("../models/materiales");

const getTodos = async (req, res) => {
  try {
    res.status(200).json(await materialesModel.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const crear = async (req, res) => {
  try {
    const nuevoMaterial = new materialesModel(req.body);
    const materialGuardado = await nuevoMaterial.save();
    res.status(201).json(materialGuardado);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getPorId = async (req, res) => {
  try {
    let id = req.params.id;
    const mat = materialesModel.findById(id);
    if (mat) {
      res.status(200).json(mat);
    } else {
      return res.status(404).json({
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
    const matActualizado = await materialesModel.findByIdAndUpdate(
      id,
      req.body,
      { new: true }
    );
    if (matActualizado) {
      res.status(200).json(materialActualizado);
    } else {
      return res.status(404).json({
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
    const matEliminado = await Material.findByIdAndDelete(id);
    if (matEliminado) {
      res.status(200).json({ message: "Material eliminado" });
    } else {
      return res.status(404).json({ message: "Material no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getTodos,
  crear,
  getPorId,
  actualizarPorId,
  eliminarPorId,
};
