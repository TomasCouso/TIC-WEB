const Material = require("../models/materiales");
const PedidoMaterial = require("../models/pedidosMateriales");

const getMateriales = async (req, res) => {
  try {
    res.status(200).json(await Material.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createMaterial = async (req, res) => {
  try {
    const nuevoMaterial = new Material(req.body);
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
    const mat = await Material.findById(id);
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
    const id = req.params.id;

    const matActualizado = await Material.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!matActualizado) {
      res.status(404).json({
        id,
        actualizado: false,
      });
    }

    const pedidoMaterialActualizado = await PedidoMaterial.updateMany(
      { "materiales._id": id },
      { $set: { "materiales.$.nombre": matActualizado.nombre } }
    );

    if (pedidoMaterialActualizado.modifiedCount === 0) {
      res
        .status(404)
        .json({ mensaje: "Material no encontrado o no se realizaron cambios" });
    }

    res.status(200).json(matActualizado);
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

const deleteMaterial = async (req, res) => {
  try {
    const id = req.params.id;

    const matEliminado = await Material.findByIdAndDelete(id);

    if (!matEliminado) {
      res.status(404).json({ message: "Material no encontrado" });
    }

    const pedidoMaterialActualizado = await PedidoMaterial.updateMany(
      { "materiales._id": id },
      {
        $set: {
          "materiales.$.nombre": `${matEliminado.nombre} (material eliminado)`,
          estado: "cancelado",
        },
      }
    );

    res
      .status(200)
      .json({
        message: "Material eliminado y pedidos actualizados",
        pedidoMaterialActualizado,
      });
  } catch (e) {
    res.status(500).json({ message: e.message });
  }
};

module.exports = {
  getMateriales,
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
