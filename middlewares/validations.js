const jwt = require('jsonwebtoken');

const validarJwt = async (req, res, next) => {
    
    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            mensaje: 'No hay token en la petición'
        });
    }

    try { //jwt.verify  verifica si el token es válido
        const data = jwt.verify( token, process.env.SECRETORPRIVATEKEY );
        const {nombre} = data;
        

        if( req.user.nombre !== nombre ) {
            return res.status(401).json({mensaje: 'Token no válido - usuario no existe DB'})
        }
        
        next();

    } catch (e) {
        console.log(e);
        res.status(401).json({mensaje: 'Token no válido'})
    }
}

//VERIFICA SI ESTA AUTENTICADO COMO ADMIN
const validarAdmin = (req, res, next) => {
    if (req.user.rol === "ADMIN"){
        return next();
    }
    res.status(401).json({mensaje: "Autenticación no válida"})
    
}

//VERIFICA SI ESTA AUTENTICADO
const validarAuth = (req, res, next) => {
    if (req.user.rol != "ADMIN" && req.user.rol != "EMPLEADO"){   
        res.status(401).json({mensaje: "Autenticación no válida"})
    }

    next();
}

module.exports = {
    validarAdmin,
    validarJwt,
    validarAuth,
}