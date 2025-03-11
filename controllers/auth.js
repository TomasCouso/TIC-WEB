const axios = require("axios");
const jwt = require("jsonwebtoken");
const { checkExists } = require("../helpers/errorHandler");

const loginMicrosoft = (req, res) => {
  res.redirect(getUrlLogin());
};

const loginCallback = async (req, res, next) => {
  const { code } = req.query;
  checkExists(code, "No se encontro el codigo de autorización", 400);

  const params = new URLSearchParams();
  params.append("client_id", process.env.CLIENT_ID);
  params.append("client_secret", process.env.CLIENT_SECRET);
  params.append("grant_type", "authorization_code");
  params.append("code", code);
  params.append("redirect_uri", process.env.REDIRECT_URI);

  try {
    // obtener un token de acceso
    const response = await axios.post(
      `https://login.microsoftonline.com/${process.env.TENANT_ID}/oauth2/v2.0/token`,
      params,
      { headers: { "Content-Type": "application/x-www-form-urlencoded" } }
    );

    const accessToken = response.data.access_token;

    // Usas el token para obtener la info del usuario desde Microsoft Graph
    const userResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const user = userResponse.data;
    const datosUsuario = {
      email: user.mail,
      nombre: user.displayName,
      id: user.id,
    };

    // verificar que el email sea de la universidad
    checkExists(
      datosUsuario.email.endsWith("@alu.inspt.utn.edu.ar") ||
        datosUsuario.email.endsWith("@inspt.utn.edu.ar"),
      "Acceso denegado",
      403
    );

    // Aquí creas tu propio token usando solo datos del usuario
    const appToken = jwt.sign({ datosUsuario }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.cookie("token", appToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production", // Solo en producción (HTTPS)
      maxAge: 5 * 60 * 60 * 1000, // 5 horas en milisegundos
      sameSite: "lax",
    });

    res.redirect("http://localhost:5173/");
  } catch (error) {
    next(error);
  }
};

const getUserData = (req, res) => {
  if (req.usuario) {
    return res.json({ user: req.usuario });
  }
  res.status(204).end();
};

const logout = (req, res) => {
  res.clearCookie("token", {
    path: "/",
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
  });

  res.status(200).json({ message: "Sesión cerrada correctamente" });
};

function getUrlLogin() {
  const client_tenant = process.env.TENANT_ID;
  const client_id = process.env.CLIENT_ID;
  const redirect_uri = process.env.REDIRECT_URI;

  return `https://login.microsoftonline.com/${client_tenant}/oauth2/v2.0/authorize?client_id=${client_id}&response_type=code&redirect_uri=${redirect_uri}&scope=openid%20profile%20email%20User.Read`;
}

module.exports = {
  loginMicrosoft,
  loginCallback,
  getUserData,
  logout,
};
