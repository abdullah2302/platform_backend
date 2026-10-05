const { error: logError } = require('../utils/logger')

module.exports = (err, req, res, next) => {
  if (res.headersSent) return next(err)
  logError(err.message, { path: req.path, method: req.method })
  return res.status(err.statusCode || (err.name === 'ValidationError' ? 400 : 500)).json({
    success: false,
    message: err.statusCode ? err.message : 'Internal server error',
  })
}
