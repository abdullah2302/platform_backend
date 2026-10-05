const searchService = require('../services/search.service')
const { sendSuccess } = require('../utils/response')

async function search(req, res) {
  return sendSuccess(res, await searchService.searchPeople(req.query.q, req.query))
}

module.exports = { search }
