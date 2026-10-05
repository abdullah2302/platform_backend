import Availability from '../models/availability.model.js'
import { sendSuccess } from '../utils/response.js'

async function get(req, res) {
  return sendSuccess(res, await Availability.findOne({ person: req.params.personId }))
}

async function upsert(req, res) {
  return sendSuccess(res, await Availability.findOneAndUpdate(
    { person: req.params.personId },
    { ...req.body, person: req.params.personId },
    { new: true, upsert: true, runValidators: true },
  ))
}

export { get, upsert }
