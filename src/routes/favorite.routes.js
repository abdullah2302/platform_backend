import express from 'express'
import * as controller from '../controllers/favorite.controller.js'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import validation from '../validations/favorite.validation.js'

const router = express.Router()
router.get('/', auth, controller.listFavorites)
router.post('/', auth, validate(validation.add), controller.add)
router.delete('/:personId', auth, controller.remove)
router.get('/lists', auth, controller.lists)
router.post('/lists', auth, validate(validation.list), controller.createList)
export default router
