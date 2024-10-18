const mongoose = require("mongoose");

const maquinaSchema = new mongoose.Schema({
    oficina: { //LAB_B
        type: String,
        required: true
    },
    nombre: { //PC01 o LAB01
        type: String,
        required: true
    },
    procesador: {
        type: String,
        required: true
    },
    memoriaRAM: { //8GB TAMBIEN PODRIAMOS AÑADIR tipoRAM (DDR3, etc.) 
        type: Number,
        required: true
    },
    tarjetaGrafica: {
        type: String,
        enum: ["NVIDIA", "AMD", "INTEL", "OTHER"],
        required: true
    },
    motherboard:{
        type: String,
        required: true
    },
    tamanhoDiscoSSD: {
        type: Number,
        required: true,
    },
    tamanhoDiscoHDD: {
        type: Number,
        required: true,
    },
    fechaUltimoMantenimiento: {
        type: Date,
        default: Date.now
    },
    empleadoResponsableMantenimiento: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Empleado",
        required: true
    }
})