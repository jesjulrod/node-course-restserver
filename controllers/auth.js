const { response } = require("express");
const bcryptjs = require('bcryptjs');

const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generar-jwt");

const login = async (req, res = response) => {
    const { correo, password } = req.body;

    try {
        // verificar si email existe
        const usuario = await Usuario.findOne({ correo });

        if (!usuario) {
            return res.status(400).json({
                msg: 'Usuario / Contraseña no son correctos - correo'
            });
        }

        // verificar si usuario activo
        if (!usuario.estado) {
            return res.status(400).json({
                msg: 'Usuario se encuentra inactivo'
            });
        }

        // validar contraseña
        if (!bcryptjs.compareSync(password, usuario.password)) {
            return res.status(400).json({
                msg: 'Contraseña no coincide con la del sistema'
            });
        }

        // generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo salio mal'
        });
    }
}


module.exports = {
    login
}