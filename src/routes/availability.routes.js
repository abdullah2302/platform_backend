import express from 'express'
import * as controller from '../controllers/availability.controller.js'
import auth from '../middleware/auth.js'

const router = express.Router()
router.get('/person/:personId', controller.get)
router.put('/person/:personId', auth, controller.upsert)
export default router
