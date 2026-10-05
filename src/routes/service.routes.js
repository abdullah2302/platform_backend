import express from 'express'
import * as controller from '../controllers/service.controller.js'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import validation from '../validations/service.validation.js'

const router = express.Router()
router.get('/person/:personId', controller.list)
router.post('/person/:personId', auth, validate(validation.create), controller.create)
router.patch('/:id', auth, validate(validation.update), controller.update)
router.delete('/:id', auth, controller.remove)
export default router
