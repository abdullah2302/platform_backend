import express from 'express'
import * as controller from '../controllers/message.controller.js'
import auth from '../middleware/auth.js'
import validate from '../middleware/validate.js'
import validation from '../validations/message.validation.js'

const router = express.Router()
router.get('/inquiry/:inquiryId', auth, controller.list)
router.post('/inquiry/:inquiryId', auth, validate(validation.create), controller.create)
export default router
