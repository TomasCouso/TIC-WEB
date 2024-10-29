require("dotenv").config(); //CARGA VARIABLES DE ENTORNO DEL ARCHIVO .ENV

const Server = require("./Server"); //IMPORTA LA CLASE SERVER

const server = new Server(); //CREA LA INSTANCIA DEL SERVIDOR
server.listen(); //SERVIDOR COMIENZA A ESCUCHAR EN EL PUERTO ESPECIFICADO

