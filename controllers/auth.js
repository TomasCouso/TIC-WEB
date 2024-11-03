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

    // obtener información del usuario
    const userResponse = await axios.get(
      "https://graph.microsoft.com/v1.0/me",
      { headers: { Authorization: `Bearer ${accessToken}` } }
    );

    const user = userResponse.data;
    const datosUsuario = {
      email: user.mail,
      nombre: user.displayName,
    };

    // verificar que el email sea de la universidad
    checkExists(datosUsuario.email.endsWith("@alu.inspt.utn.edu.ar") || datosUsuario.email.endsWith("@inspt.utn.edu.ar"),
      "Acceso denegado",
      403
    );

    // crear el token de acceso con el usuario
    const appToken = jwt.sign({ datosUsuario }, process.env.JWT_SECRET, {
      expiresIn: "5h",
    });

    res.set("Authorization", `Bearer ${appToken}`);

    res.status(200).json({
      mensaje: "Inicio de sesión exitoso",
      token: appToken,
    });
  } catch (error) {
    next(error);
  }
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
};
