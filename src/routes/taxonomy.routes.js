import express from 'express'
import * as controller from '../controllers/taxonomy.controller.js'

const router = express.Router()
router.get('/:type', controller.list)
export default router
