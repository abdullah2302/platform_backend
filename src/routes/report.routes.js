import express from 'express'
import * as controller from '../controllers/admin.controller.js'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import validation from '../validations/admin.validation.js'

const router = express.Router()
router.post('/', auth, validate(validation.report), controller.createReport)
export default router
