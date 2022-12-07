const { response, request } = require('express');

const getUsuarios = (req = request, res = response) => {
    const { q, name = 'No Name' } = req.query;
    
    res.json({
        msg: 'Http Get - controlador',
        q,
        name
    });
}

const postUsuarios = (req, res = response) => {
    const { name, age } = req.body;

    res.json({
        msg: 'Http Post - controlador',
        name,
        age
    });
}

const deleteUsuarios = (req, res = response) => {
    res.json({
        msg: 'Http Delete - controlador'
    });
}

const putUsuarios = (req, res = response) => {
    const { id } = req.params
    res.json({
        msg: 'Http Put - controlador',
        id
    });
}

const patchUsuarios = (req, res = response) => {
    res.json({
        msg: 'Http Patch - controlador'
    });
}

module.exports = {
    getUsuarios,
    postUsuarios,
    deleteUsuarios,
    putUsuarios,
    patchUsuarios
};
