function sendSuccess(res, data, statusCode = 200) {
  return res.status(statusCode).json({ success: true, data })
}

function sendError(res, message, statusCode = 500, details) {
  const body = { success: false, message }
  if (details) body.details = details
  return res.status(statusCode).json(body)
}

module.exports = { sendSuccess, sendError }
