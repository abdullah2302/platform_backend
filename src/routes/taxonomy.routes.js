const express = require('express')
const controller = require('../controllers/taxonomy.controller')

const router = express.Router()
router.get('/:type', controller.list)
module.exports = router
