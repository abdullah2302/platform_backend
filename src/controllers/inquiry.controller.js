import Inquiry from '../models/inquiry.model.js'
import { sendSuccess } from '../utils/response.js'

async function create(req, res) {
  return sendSuccess(res, await Inquiry.create({
    requester: req.user.sub,
    person: req.body.person,
    service: req.body.service,
    subject: req.body.subject,
    message: req.body.message,
  }), 201)
}

async function mine(req, res) {
  return sendSuccess(res, await Inquiry.find({ requester: req.user.sub }).populate('person service').sort({ createdAt: -1 }))
}

async function get(req, res) {
  return sendSuccess(res, await Inquiry.findById(req.params.id).populate('person requester service'))
}

async function updateStatus(req, res) {
  return sendSuccess(res, await Inquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true, runValidators: true }))
}

export { create, mine, get, updateStatus }
