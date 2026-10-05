import Person from '../models/people.model.js'
import { sendSuccess } from '../utils/response.js'

async function search(req, res) {
  const query = req.query.q
  const filter = query ? { $text: { $search: query } } : {}
  const limit = Math.min(Math.max(Number(req.query.limit) || 20, 1), 100)
  const results = await Person.find(filter)
    .limit(limit)
    .sort(query ? { score: { $meta: 'textScore' } } : { name: 1 })
  return sendSuccess(res, results)
}

export { search }
