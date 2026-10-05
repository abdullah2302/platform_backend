import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import User from '../models/auth.model.js'
import { sendSuccess } from '../utils/response.js'

dotenv.config()

async function register(req, res) {
  const { name, email, password } = req.body
  const existing = await User.findOne({ email })
  if (existing) {
    const error = new Error('Email is already registered')
    error.statusCode = 409
    throw error
  }
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) })
  return sendSuccess(res, createSession(user), 201)
}

async function login(req, res) {
  const { email, password } = req.body
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error('Invalid email or password')
    error.statusCode = 401
    throw error
  }
  return sendSuccess(res, createSession(user))
}

function createSession(user) {
  const token = jwt.sign(
    { sub: user._id.toString(), role: user.role },
    process.env.JWT_SECRET || 'development-only-secret',
    { expiresIn: process.env.JWT_EXPIRES_IN || '7d' },
  )
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
}

async function me(req, res) {
  return sendSuccess(res, await User.findById(req.user.sub).select('-password'))
}

export { register, login, me }
