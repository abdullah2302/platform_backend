import Service from '../models/service.model.js'
import { sendSuccess } from '../utils/response.js'

async function list(req, res) {
  return sendSuccess(res, await Service.find({ person: req.params.personId, active: true }).sort({ createdAt: -1 }))
}

async function create(req, res) {
  return sendSuccess(res, await Service.create({ ...req.body, person: req.body.person || req.params.personId }), 201)
}

async function update(req, res) {
  return sendSuccess(res, await Service.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }))
}

async function remove(req, res) {
  await Service.findByIdAndUpdate(req.params.id, { active: false })
  return res.status(204).send()
}

export { list, create, update, remove }
