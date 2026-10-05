const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const User = require('../models/auth.model')
const env = require('../config/env')

async function register({ name, email, password }) {
  const existing = await User.findOne({ email })
  if (existing) {
    const error = new Error('Email is already registered')
    error.statusCode = 409
    throw error
  }
  const user = await User.create({ name, email, password: await bcrypt.hash(password, 12) })
  return createSession(user)
}

async function login({ email, password }) {
  const user = await User.findOne({ email }).select('+password')
  if (!user || !(await bcrypt.compare(password, user.password))) {
    const error = new Error('Invalid email or password')
    error.statusCode = 401
    throw error
  }
  return createSession(user)
}

function createSession(user) {
  const token = jwt.sign({ sub: user._id.toString(), role: user.role }, env.jwtSecret, { expiresIn: env.jwtExpiresIn })
  return { token, user: { id: user._id, name: user.name, email: user.email, role: user.role } }
}

async function getCurrentUser(id) {
  return User.findById(id).select('-password')
}

module.exports = { register, login, getCurrentUser }
