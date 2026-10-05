import Favorite from '../models/favorite.model.js'
import List from '../models/list.model.js'
import { sendSuccess } from '../utils/response.js'

async function listFavorites(req, res) {
  return sendSuccess(res, await Favorite.find({ user: req.user.sub }).populate('person list').sort({ createdAt: -1 }))
}

async function add(req, res) {
  return sendSuccess(res, await Favorite.create({ user: req.user.sub, person: req.body.person, list: req.body.list }), 201)
}

async function remove(req, res) {
  await Favorite.deleteOne({ user: req.user.sub, person: req.params.personId })
  return res.status(204).send()
}

async function lists(req, res) {
  return sendSuccess(res, await List.find({ user: req.user.sub }).sort({ name: 1 }))
}

async function createList(req, res) {
  return sendSuccess(res, await List.create({ ...req.body, user: req.user.sub }), 201)
}

export { listFavorites, add, remove, lists, createList }
