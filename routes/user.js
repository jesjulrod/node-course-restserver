const { Router } = require('express');
const { getUsuarios, postUsuarios, deleteUsuarios, putUsuarios, patchUsuarios } = require('../controllers/user');

const router = Router();

router.get('/', getUsuarios);

router.post('/', postUsuarios);

router.delete('/', deleteUsuarios);

router.put('/:id', putUsuarios);

router.patch('/', patchUsuarios);

module.exports = router;