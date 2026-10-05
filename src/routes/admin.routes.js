import express from 'express'
import * as controller from '../controllers/admin.controller.js'
import auth from '../middleware/auth.js'
import role from '../middleware/role.js'
import validate from '../middleware/validate.js'
import validation from '../validations/admin.validation.js'

const router = express.Router()
router.use(auth, role('admin'))
router.get('/users', controller.users)
router.get('/reports', controller.reports)
router.patch('/reports/:id', validate(validation.reportUpdate), controller.updateReport)
router.get('/audit-logs', controller.auditLogs)
export default router
