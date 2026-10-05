const Person = require('../models/people.model')
const slugify = require('../utils/slug')

async function listPeople({ search, country, industry, profession, topic, page = 1, limit = 20 }) {
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
  return { items, total, page: safePage, limit: safeLimit, pages: Math.ceil(total / safeLimit) }
}

async function getPerson(idOrSlug) {
  return Person.findOne({ $or: [{ _id: idOrSlug }, { slug: idOrSlug }] })
}

async function createPerson(data) {
  return Person.create({ ...data, slug: data.slug || slugify(data.name) })
}

async function updatePerson(id, data) {
  return Person.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

module.exports = { listPeople, getPerson, createPerson, updatePerson }
