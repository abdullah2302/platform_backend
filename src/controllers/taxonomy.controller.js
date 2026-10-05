const taxonomyService = require('../services/taxonomy.service')
const { sendSuccess } = require('../utils/response')

async function list(req, res) {
  return sendSuccess(res, await taxonomyService.listTaxonomy(req.params.type))
}

module.exports = { list }
