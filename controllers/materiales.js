const materialesModel = require("../models/materiales");

const getMateriales = async (req, res) => {
  try {
    res.status(200).json(await materialesModel.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createMaterial = async (req, res) => {
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

const getMaterial = async (req, res) => {
  try {
    let id = req.params.id;
    const mat = await materialesModel.findById(id);
    if (mat) {
      res.status(200).json(mat);
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

const updateMaterial = async (req, res) => {
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
      res.status(404).json({
        id,
        actualizado: false,
      });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    let id = req.params.id;
    const matEliminado = await materialesModel.findByIdAndDelete(id);
    if (matEliminado) {
      res.status(200).json({ message: "Material eliminado" });
    } else {
      res.status(404).json({ message: "Material no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getMateriales,
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
