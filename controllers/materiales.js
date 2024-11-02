const Material = require("../models/materiales");
const PedidoMaterial = require("../models/pedidosMateriales");

const getMateriales = async (req, res, next) => {
  try {
    const materiales = await Material.find();
    checkExists(materiales, "No se encontraron materiales", 404);
    res.status(200).json(materiales);
  } catch (e) {
    next(e);
  }
};

const createMaterial = async (req, res, next) => {
  try {
    const nuevoMaterial = new Material(req.body);
    const materialGuardado = await nuevoMaterial.save();
    checkExists(materialGuardado, "Hubo un error al crear el material", 404);
    res.status(201).json(materialGuardado);
  } catch (e) {
    next(e);
  }
};

const getMaterial = async (req, res, next) => {
  try {
    const id = req.params.id;
    const material = await Material.findById(id);
    checkExists(material, "No se encontro el material", 404);
    res.status(200).json(material);
  } catch (e) {
    next(e);
  }
};

const updateMaterial = async (req, res, next) => {
  try {
    const id = req.params.id;
    const materialParaActualizar = await Material.findByIdAndUpdate(id, req.body, {
      new: true, runValidators: true,
    });

    checkExists(materialParaActualizar, "No se encontro el material", 404);

    await PedidoMaterial.updateMany(
      { "materiales._id": id },
      { $set: { "materiales.$.nombre": materialParaActualizar.nombre } }
    );

    res.status(200).json(materialParaActualizar);
  } catch (e) {
    next(e);
  }
};

const deleteMaterial = async (req, res, next) => {
  try {
    const id = req.params.id;
    const materialParaEliminar = await Material.findByIdAndDelete(id);

    checkExists(materialParaEliminar, "No se encontro el material a eliminar", 404);

    const pedidoMaterialActualizado = await PedidoMaterial.updateMany(
      { "materiales._id": id },
      {
        $set: {
          "materiales.$.nombre": `${materialParaEliminar.nombre} (material eliminado)`,
          estado: "cancelado",
        },
      }
    );

    res.status(200).json({ message: "Material eliminado y pedidos actualizados", pedidoMaterialActualizado });
  } catch (e) {
    next(e);
  }
};

module.exports = {
  getMateriales,
  createMaterial,
  getMaterial,
  updateMaterial,
  deleteMaterial,
};
