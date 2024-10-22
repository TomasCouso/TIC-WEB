const mongoose = require("mongoose");

const solicitudSchema = new mongoose.Schema(
    {
        emailSolicitante: {
            type: String,
            required: true,
        },
        asunto: {
            type: String,
            required: true,
        },
        texto: {
            type: String,
            required: true,
        },
        categoria: {
            _id: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Categoria",
                required: true,
            },
            nombre: String,
        },
        fechaSolicitud: {
            type: Date,
            default: Date.now,
        },
    },
    {
        collection: "solicitudes",
        timestamps: true,
    }
)

const Solicitud = mongoose.model('Solicitud', solicitudSchema)

module.exports = Solicitud