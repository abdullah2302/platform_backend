import express from 'express'
import * as controller from '../controllers/auth.controller.js'
import validate from '../middleware/validate.js'
import auth from '../middleware/auth.js'
import validation from '../validations/auth.validation.js'

const router = express.Router()
router.post('/register', validate(validation.register), controller.register)
router.post('/login', validate(validation.login), controller.login)
router.get('/me', auth, controller.me)
export default router
