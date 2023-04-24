const { Router } = require('express');
const { check } = require('express-validator');

const { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios, patchUsuarios } = require('../controllers/user');
const { esRolValido, esCorreoValido, existeUsuarioPorId } = require('../helpers/db-validators');

const { 
    validarCampos, 
    validarJWT, 
    esAdminRole, 
    tieneRole 
} = require('../middlewares');

const router = Router();

router.get('/', getUsuarios);

router.post('/', [
    check('nombre', 'El campo nombre es obligatorio').notEmpty(),
    check('password', 'El password debe contener al menos 6 caracteres').isLength({ min: 6 }),
    check('correo', 'Correo no válido').isEmail(),
    check('correo').custom(esCorreoValido),
    check('rol').custom(esRolValido),
    validarCampos
], postUsuarios);

router.delete('/:id', [
    validarJWT,
    // esAdminRole,
    tieneRole('ADMIN_ROLE', 'VENTAS_ROLE'),
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    validarCampos
], deleteUsuarios);

router.put('/:id', [
    check('id', 'No es un ID válido').isMongoId(),
    check('id').custom(existeUsuarioPorId),
    check('rol').custom(esRolValido),
    validarCampos
], putUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;