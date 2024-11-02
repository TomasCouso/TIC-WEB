const Noticia = require("../models/noticias");
const Instructivo = require("../models/instructivos");
const Empleado = require("../models/empleados");
const { checkExists } = require("../helpers/errorHandler");

const getIndex = async (req, res, next) => {
  try {
    const noticias = await Noticia.find().limit(3);
    const instructivos = await Instructivo.find().limit(3);
    const empleadosNombres = (await Empleado.find()).map((e) => e.nombre);

    checkExists(noticias, "No se encontraron noticias", 404);
    checkExists(instructivos, "No se encontraron instructivos", 404);
    checkExists(empleadosNombres, "No se encontraron empleados", 404);

    const datos = {
      nombre: "TIC",
      descripcion: "Tecnología de Información y Comunicación",
      logo: "logo de TIC",
      email: "email de TIC",
      interno: "telefono interno de TIC",
      direccion: "Piso 3 TIC",
      mision: "mision de TIC",
      vision: "vision de TIC",
      empleados: empleadosNombres,
    };

    res.status(200).json({ noticias, instructivos, datos });
  } catch (e) {
    next(e);
  }
};

module.exports = { getIndex };
