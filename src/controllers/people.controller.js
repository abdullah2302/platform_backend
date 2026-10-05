import Person from '../models/people.model.js'
import slugify from '../utils/slug.js'
import { sendSuccess } from '../utils/response.js'

async function list(req, res) {
  const { search, country, industry, profession, topic, page = 1, limit = 20 } = req.query
  const filter = {}
  if (search) filter.$text = { $search: search }
  if (country) filter.country = country
  if (industry) filter.industry = industry
  if (profession) filter.profession = profession
  if (topic) filter.topics = topic
  const safePage = Math.max(Number(page) || 1, 1)
  const safeLimit = Math.min(Math.max(Number(limit) || 20, 1), 100)
  const [items, total] = await Promise.all([
    Person.find(filter).sort({ name: 1 }).skip((safePage - 1) * safeLimit).limit(safeLimit),
    Person.countDocuments(filter),
  ])
  return sendSuccess(res, { items, total, page: safePage, limit: safeLimit, pages: Math.ceil(total / safeLimit) })
}

async function get(req, res) {
  return sendSuccess(res, await Person.findOne({ $or: [{ _id: req.params.id }, { slug: req.params.id }] }))
}

async function create(req, res) {
  return sendSuccess(res, await Person.create({ ...req.body, slug: req.body.slug || slugify(req.body.name) }), 201)
}

async function update(req, res) {
  return sendSuccess(res, await Person.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true }))
}

export { list, get, create, update }
