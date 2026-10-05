import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { connectDB, disconnectDB } from '../config/db.js'
import Person from '../models/people.model.js'
import Industry from '../models/industry.model.js'
import Profession from '../models/profession.model.js'
import Topic from '../models/topic.model.js'
import SourceRecord from '../models/source-record.model.js'
import people from './data/people.json' with { type: 'json' }
import industries from './data/industries.json' with { type: 'json' }
import professions from './data/professions.json' with { type: 'json' }
import topics from './data/topics.json' with { type: 'json' }

async function seed() {
  await connectDB()
  const data = [
    [Industry, industries],
    [Profession, professions],
    [Topic, topics],
  ]
  for (const [Model, records] of [[Person, people], ...data]) {
    if (records.length > 0) {
      await Model.deleteMany({})
      const inserted = await Model.insertMany(records)
      if (Model === Person) {
        await SourceRecord.deleteMany({})
        await SourceRecord.insertMany(inserted.map((person) => ({
          person: person._id,
          source: 'Platform seed dataset',
          sourceUrl: 'https://example.com/platform-seed',
        })))
      }
    }
  }
  await disconnectDB()
}

if (process.argv[1] && fileURLToPath(import.meta.url) === path.resolve(process.argv[1])) {
  seed().catch(async (error) => {
    console.error('Seeding failed', error)
    await disconnectDB()
    process.exitCode = 1
  })
}

export default seed
