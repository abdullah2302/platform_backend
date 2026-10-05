const authService = require('../services/auth.service')
const { sendSuccess } = require('../utils/response')

async function register(req, res) { return sendSuccess(res, await authService.register(req.body), 201) }
async function login(req, res) { return sendSuccess(res, await authService.login(req.body)) }
async function me(req, res) { return sendSuccess(res, await authService.getCurrentUser(req.user.sub)) }

module.exports = { register, login, me }
