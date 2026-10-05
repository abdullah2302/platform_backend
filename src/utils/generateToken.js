import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'

dotenv.config()

export default function generateToken(user) {
  return jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'development-only-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )
}
