import Industry from '../models/industry.model.js'
import Profession from '../models/profession.model.js'
import Topic from '../models/topic.model.js'
import { sendSuccess } from '../utils/response.js'

const models = { industries: Industry, professions: Profession, topics: Topic }

async function list(req, res) {
  const Model = models[req.params.type]
  if (!Model) {
    const error = new Error('Unknown taxonomy type')
    error.statusCode = 404
    throw error
  }
  return sendSuccess(res, await Model.find().sort({ name: 1 }))
}

export { list }
