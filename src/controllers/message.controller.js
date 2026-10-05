import Message from '../models/message.model.js'
import Inquiry from '../models/inquiry.model.js'
import { sendSuccess } from '../utils/response.js'

async function list(req, res) {
  return sendSuccess(res, await Message.find({ inquiry: req.params.inquiryId }).populate('sender', 'name email').sort({ createdAt: 1 }))
}

async function create(req, res) {
  const inquiry = await Inquiry.findById(req.params.inquiryId)
  if (!inquiry) return res.status(404).json({ success: false, message: 'Inquiry not found' })
  return sendSuccess(res, await Message.create({ inquiry: inquiry._id, sender: req.user.sub, body: req.body.body }), 201)
}

export { list, create }
