const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/auth.model')
const env = require('../config/env')
const { sendSuccess } = require('../utils/response')

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
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
}

async function me(req, res) {
  return sendSuccess(res, await User.findById(req.user.sub).select('-password'))
}

module.exports = { register, login, me }
