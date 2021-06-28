const {Router}= require('express')
const { contactosGet,
    contactPost,
    contactPut,
    contactDelete } = require('../controllers/contacts')
const router = Router()
var mdAutenticacion = require('../middlewares/autenticacion');
 
//GET
router.get('/',mdAutenticacion.verificaToken, contactosGet)
//POST
router.post('/',mdAutenticacion.verificaToken, contactPost)
//PUT-actualziar
router.put('/:id',mdAutenticacion.verificaToken, contactPut)
//DELETE
router.delete('/:id',mdAutenticacion.verificaToken,contactDelete)

module.exports = router;