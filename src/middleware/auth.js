const jwt = require('jsonwebtoken')
const env = require('../config/env')

module.exports = (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Authentication required' })
  try {
    req.user = jwt.verify(header.slice(7), env.jwtSecret)
    return next()
  } catch (error) {
    error.statusCode = 401
    return next(error)
  }
}
