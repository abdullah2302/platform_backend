const express = require('express')
const controller = require('../controllers/auth.controller')
const validate = require('../middleware/validate')
const auth = require('../middleware/auth')
const validation = require('../validations/auth.validation')

const router = express.Router()
router.post('/register', validate(validation.register), controller.register)
router.post('/login', validate(validation.login), controller.login)
router.get('/me', auth, controller.me)
module.exports = router
