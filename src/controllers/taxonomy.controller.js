const Industry = require('../models/industry.model')
const Profession = require('../models/profession.model')
const Topic = require('../models/topic.model')
const { sendSuccess } = require('../utils/response')

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

module.exports = { list }
