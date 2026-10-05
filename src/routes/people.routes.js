import express from 'express'
import * as controller from '../controllers/people.controller.js'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import validation from '../validations/people.validation.js'

const router = express.Router()
router.get('/', controller.list)
router.get('/:id', controller.get)
router.post('/', auth, validate(validation.create), controller.create)
router.patch('/:id', auth, validate(validation.update), controller.update)
export default router
