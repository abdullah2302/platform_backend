const { connectDatabase, disconnectDatabase } = require('../config/db')
const Person = require('../models/people.model')
const Industry = require('../models/industry.model')
const Profession = require('../models/profession.model')
const Topic = require('../models/topic.model')

async function seed() {
  await connectDatabase()
  const data = [
    [Person, require('./data/people.json')],
    [Industry, require('./data/industries.json')],
    [Profession, require('./data/professions.json')],
    [Topic, require('./data/topics.json')],
  ]
  for (const [Model, records] of data) {
    if (records.length > 0) {
      await Model.deleteMany({})
      await Model.insertMany(records)
    }
  }
  await disconnectDatabase()
}

if (require.main === module) {
  seed().catch(async (error) => {
    console.error('Seeding failed', error)
    await disconnectDatabase()
    process.exitCode = 1
  })
}

module.exports = seed
