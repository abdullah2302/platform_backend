module.exports = (schema) => (req, res, next) => {
  const result = schema.safeParse({ body: req.body, query: req.query, params: req.params })
  if (!result.success) {
    return res.status(400).json({ success: false, message: 'Validation failed', details: result.error.issues })
  }
  req.body = result.data.body
  req.query = result.data.query
  req.params = result.data.params
  return next()
}
