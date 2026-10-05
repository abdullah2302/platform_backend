const Industry = require('../models/industry.model')
const Profession = require('../models/profession.model')
const Topic = require('../models/topic.model')

const models = { industries: Industry, professions: Profession, topics: Topic }

async function listTaxonomy(type) {
  const Model = models[type]
  if (!Model) {
    const error = new Error('Unknown taxonomy type')
    error.statusCode = 404
    throw error
  }
  return Model.find().sort({ name: 1 })
}

module.exports = { listTaxonomy }
