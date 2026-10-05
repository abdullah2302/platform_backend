import express from 'express'
import * as controller from '../controllers/inquiry.controller.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
import validate from '../middleware/validate.js'
import validation from '../validations/inquiry.validation.js'

const router = express.Router()
router.post('/', auth, role('business', 'agency', 'organization'), validate(validation.create), controller.create)
router.get('/mine', auth, controller.mine)
router.get('/:id', auth, controller.get)
router.patch('/:id/status', auth, validate(validation.status), controller.updateStatus)
export default router
