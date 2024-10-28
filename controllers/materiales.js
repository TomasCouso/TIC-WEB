const Material = require("../models/materiales");
const PedidoMaterial = require("../models/pedidosMateriales");

const getMateriales = async (req, res, next) => {
  try {
    const materiales = await Material.find();

    if (!materiales) {
      const error = new Error("No se encontraron materiales");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json(materiales);
  } catch (e) {
    next(e);
  }
};

const createMaterial = async (req, res, next) => {
  try {
    const nuevoMaterial = new Material(req.body);
    const materialGuardado = await nuevoMaterial.save();
    res.status(201).json(materialGuardado);
  } catch (e) {
    next(e);
  }
};

const getMaterial = async (req, res, next) => {
  try {
    let id = req.params.id;
    const material = await Material.findById(id);

    if (!material) {
      const error = new Error("No se encontraron materiales");
      error.statusCode = 404;
      throw error;
    }
    /*else {
      res.status(404).json({
        id,
        encontrado: false,
      });
    }*/
    res.status(200).json(material);
  } catch (e) {
    next(e);
  }
};

const updateMaterial = async (req, res, next) => {
  try {
    const id = req.params.id;

    const materialParaActualizar  = await Material.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!materialParaActualizar) { //CAMBIE EL NOMBRE DE LA VARIABLE PARA QUE SEA MAS DESCRIPTIVA
      const error = new Error("No se encontraron materiales");
      error.statusCode = 404;
      throw error;
    }

    /*
      res.status(404).json({
        id,
        actualizado: false,
      });
    */

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

    if (!materialParaEliminar) {
      const error = new Error("No se encontraron materiales");
      error.statusCode = 404;
      throw error;
    }

    const pedidoMaterialActualizado = await PedidoMaterial.updateMany(
      { "materiales._id": id },
      {
        $set: {
          "materiales.$.nombre": `${materialParaEliminar.nombre} (material eliminado)`,
          estado: "cancelado",
        },
      }
    );

    res.status(200).json({
      message: "Material eliminado y pedidos actualizados",
      pedidoMaterialActualizado,
    });
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
