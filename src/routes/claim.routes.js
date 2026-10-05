import express from 'express'
import * as controller from '../controllers/claim.controller.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
import validate from '../middleware/validate.js'
import validation from '../validations/claim.validation.js'

const router = express.Router()
router.post('/', auth, validate(validation.create), controller.create)
router.get('/mine', auth, controller.mine)
router.get('/', auth, role('admin'), controller.list)
router.patch('/:id', auth, role('admin'), validate(validation.review), controller.review)
export default router
