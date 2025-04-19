const Noticia = require("../models/noticias");
const Instructivo = require("../models/instructivos");
const Empleado = require("../models/empleados");

const getIndex = async (req, res, next) => {
  try {
    const noticias = await Noticia.find().sort({ createdAt: -1 }).limit(3);
    const instructivos = await Instructivo.find({ soloEmpleados: false })
      .sort({ createdAt: -1 })
      .limit(3);

    const empleadosNombres = (await Empleado.find()).map((e) => e.nombre);

    const datos = {
      nombre: "TIC",
      descripcion: "Tecnología de Información y Comunicación",
      logo: "logo de TIC",
      email: "email de TIC",
      interno: "telefono interno de TIC",
      direccion: "Piso 3 TIC",
      mision: "Brindar soluciones tecnológicas eficientes y sostenibles que optimicen los procesos institucionales, fomenten la innovación y garanticen el acceso equitativo a los recursos digitales. Trabajamos comprometidos con la mejora continua, acompañando a cada área en su transformación digital con soporte, desarrollo e infraestructura de calidad.",
      vision: "Ser un referente en la gestión e implementación de tecnologías dentro del ámbito institucional, promoviendo una cultura digital inclusiva, segura y en constante evolución. Aspiramos a consolidarnos como un equipo estratégico, impulsando el cambio y anticipándonos a los desafíos del futuro.",
      empleados: empleadosNombres,
    };

    res.status(200).json({
      noticias,
      instructivos,
      datos,
    });
  } catch (e) {
    next(e);
  }
};

const getEmpleados = async (req, res, next) => {
  try {
    const empleados = (await Empleado.find()).map((e) => {
      return {
        _id: e._id,
        nombre: e.nombre,
      };
    });
    res.status(200).json(empleados);
  } catch (e) {
    next(e);
  }
};

const getEmpleado = async (req, res, next) => {
  try {
    const empleadoNombre = (await Empleado.findById(req.params.id)).nombre;
    res.status(200).json(empleadoNombre);
  } catch (e) {
    next(e);
  }
};

module.exports = { getIndex, getEmpleados, getEmpleado };
