const peopleService = require('../services/people.service')
const { sendSuccess } = require('../utils/response')

async function list(req, res) { return sendSuccess(res, await peopleService.listPeople(req.query)) }
async function get(req, res) { return sendSuccess(res, await peopleService.getPerson(req.params.id)) }
async function create(req, res) { return sendSuccess(res, await peopleService.createPerson(req.body), 201) }
async function update(req, res) { return sendSuccess(res, await peopleService.updatePerson(req.params.id, req.body)) }

module.exports = { list, get, create, update }
