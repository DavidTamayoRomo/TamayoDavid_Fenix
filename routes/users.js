const {Router}= require('express')
const { usuariosGet, usaurioPost, usuarioPut, usuarioDelete, login } = require('../controllers/users')
const router = Router()
var mdAutenticacion = require('../middlewares/autenticacion');
 
 //GET
 router.get('/', usuariosGet)
//POST
router.post('/',mdAutenticacion.verificaToken, usaurioPost)
//PUT-actualziar
router.put('/:id',mdAutenticacion.verificaToken, usuarioPut)
//DELETE
router.delete('/:id',mdAutenticacion.verificaToken,usuarioDelete)
//LOGIN - GENERAR TOKEN
router.post('/login',login)

module.exports = router;