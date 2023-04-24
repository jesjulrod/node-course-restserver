const { response, request } = require("express");
const role = require("../models/role");


const esAdminRole = (req = request, res = response, next) => {
    if (!req.usuarioAuth) {
        res.status(401).json({
            msg: 'Se requiere verficar el role sin validar rl token primero'
        });
    }

    const { rol, nombre } = req.usuarioAuth;

    if (rol !== 'ADMIN_ROLE') {
        res.status(401).json({
            msg: `${nombre} no es administrador - acción invalida`
        });
    }

    next();
}

const tieneRole = (...roles) => {
    return (req = request, res = response, next) => {
        if (!req.usuarioAuth) {
            res.status(401).json({
                msg: 'Se requiere verficar el role sin validar rl token primero'
            });
        }

        if (!role.includes(req.usuarioAuth.rol)) {
            res.status(401).json({
                msg: `El servicio requiere uno de los siguientes roles ${roles}`
            });
        }

        next();
    }
}

module.exports = {
    esAdminRole,
    tieneRole
};