import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default (req, res, next) => {
  const header = req.headers.authorization
  if (!header || !header.startsWith('Bearer ')) return res.status(401).json({ success: false, message: 'Authentication required' })
  try {
    req.user = jwt.verify(header.slice(7), process.env.JWT_SECRET || 'development-only-secret')
    return next()
  } catch (error) {
    error.statusCode = 401
    return next(error)
  }
}
