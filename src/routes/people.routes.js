const express = require('express')
const controller = require('../controllers/people.controller')
const auth = require('../middleware/auth')
const validate = require('../middleware/validate')
const validation = require('../validations/people.validation')

const router = express.Router()
router.get('/', controller.list)
router.get('/:id', controller.get)
router.post('/', auth, validate(validation.create), controller.create)
router.patch('/:id', auth, validate(validation.update), controller.update)
module.exports = router
