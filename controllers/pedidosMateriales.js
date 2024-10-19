const pedidosMaterialesModel = require("../models/pedidosMateriales");

const getPedidos = async (req, res) => {
  try {
    res.status(200).json(await pedidosMaterialesModel.find());
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const createPedido = async (req, res) => {
  try {
    const nuevoPedidoMaterial = new pedidosMaterialesModel(req.body);
    const pedidoMaterialGuardado = await nuevoPedidoMaterial.save();
    res.status(201).json(pedidoMaterialGuardado);
  } catch (e) {
    res.status(500).json({
      mensaje: e,
    });
  }
};

const getPedido = async (req, res) => {
  try {
    let id = req.params.id;
    const pedidoMaterial = await pedidosMaterialesModel.findById(id);
    if (pedidoMaterial) {
      res.status(200).json(pedidoMaterial);
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

const updatePedido = async (req, res) => {
  try {
    let id = req.params.id;
    const pedidoMaterialActualizado =
      await pedidosMaterialesModel.findByIdAndUpdate(id, req.body, {
        new: true,
      });
    if (pedidoMaterialActualizado) {
      res.status(200).json(pedidoMaterialActualizado);
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

const deletePedido = async (req, res) => {
  try {
    let id = req.params.id;
    const pedidoMaterialEliminado =
      await pedidosMaterialesModel.findByIdAndDelete(id);
    if (pedidoMaterialEliminado) {
      res.status(200).json({ message: "Pedido de material eliminado" });
    } else {
      res.status(404).json({ message: "Pedido de material no encontrado" });
    }
  } catch (e) {
    res.status(500).json({ message: e });
  }
};

module.exports = {
  getPedidos,
  createPedido,
  getPedido,
  updatePedido,
  deletePedido,
};
