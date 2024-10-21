const Solicitud = require("../models/solicitudes");

const getSolicitudes = async (req, res) => {
    try {
        res.status(200).json(await Solicitud.find());
    } catch (e) {
        res.status(500)
            .json({ error: e.message });
    }
};

const getSolicitud = async (req, res) => {
    try {
        const id = req.params.id;
        const solicitud = await Solicitud.findById(id);
        if (solicitud) {
            res.status(200).json(solicitud);
        } else {
            res.status(404).json({
                id,
                encontrado: false,
            });
        }
    } catch (e) {
        res.status(500)
            .json({
                mensaje: e,
            });
    }
};

const createSolicitud = async (req, res) => {
    try {
        const nuevaSolicitud = new Solicitud(req.body);
        const solicitudGuardada = await nuevaSolicitud.save(); 
        res.status(201).json(solicitudGuardada);
    } catch (e) {
        res.status(500).json({
            mensaje: e,
        });
    }
};

const updateSolicitud = async (req, res) => {
    try {
        const id = req.params.id;
        const solicitudActualizada = await Solicitud.findByIdAndUpdate(
            id,
            req.body,
            {
                new: true,
            }
        );

        if (solicitudActualizada) {
            res.status(200).json(solicitudActualizada);
        } else {
            res.status(404).json({
                id,
                actualizado: false,
            });
        }
    } catch (e) {
        res.status(500).json({ mensaje: e });
    }
};

const deleteSolicitud = async (req, res) => {
    try {
        const id = req.params.id;
        const solicitudEliminada = await Solicitud.findByIdAndDelete(id); 
        if (solicitudEliminada) {
            res.status(200).json({ mensaje: "Solicitud eliminada" });
        } else {
            res.status(404).json({ mensaje: "Solicitud no encontrada" });
        }
    } catch (e) {
        res.status(500).json({ mensaje: e });
    }
}
;

module.exports = {
    getSolicitudes,
    getSolicitud,
    createSolicitud,
    updateSolicitud,
    deleteSolicitud,
}