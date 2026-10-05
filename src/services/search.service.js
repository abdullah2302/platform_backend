const Person = require('../models/people.model')

async function searchPeople(query, options = {}) {
  const filter = query ? { $text: { $search: query } } : {}
  const limit = Math.min(Math.max(Number(options.limit) || 20, 1), 100)
  return Person.find(filter).limit(limit).sort(query ? { score: { $meta: 'textScore' } } : { name: 1 })
}

module.exports = { searchPeople }
