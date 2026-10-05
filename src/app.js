const express = require('express')
const rateLimiter = require('./middleware/rateLimiter')
const errorHandler = require('./middleware/errorHandler')

const app = express()
app.use(express.json())
app.use(rateLimiter())
app.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }))
app.use('/api/auth', require('./routes/auth.routes'))
app.use('/api/people', require('./routes/people.routes'))
app.use('/api/search', require('./routes/search.routes'))
app.use('/api/taxonomy', require('./routes/taxonomy.routes'))
app.use(errorHandler)

module.exports = app
