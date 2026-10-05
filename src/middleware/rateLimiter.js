const hits = new Map()

export default (windowMs = 60_000, max = 100) => (req, res, next) => {
  const key = req.ip
  const now = Date.now()
  const current = hits.get(key)
  if (!current || now - current.startedAt >= windowMs) {
    hits.set(key, { startedAt: now, count: 1 })
    return next()
  }
  if (current.count >= max) return res.status(429).json({ success: false, message: 'Too many requests' })
  current.count += 1
  return next()
}
