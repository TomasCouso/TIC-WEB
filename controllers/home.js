const Noticia = require("../models/noticia");
const Instructivo = require("../models/instructivo");
const Empleado = require("../models/empleados");

const getIndex = async (req, res) => {
  try {
    const noticias = await Noticia.find().limit(3);
    const instructivos = await Instructivo.find().limit(3);

    const empleadosNombres = (await Empleado.find()).map((e) => e.nombre);

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

    res.status(200).json({
      noticias,
      instructivos,
      datos,
    });
  } catch (error) {
    res.status(500).json({ mensaje: "Error al obtener los datos", error });
  }
};

module.exports = { getIndex };
