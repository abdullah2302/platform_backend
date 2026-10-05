const mongoose = require('mongoose')
const env = require('./env')

async function connectDatabase() {
  await mongoose.connect(env.mongoUri)
  return mongoose.connection
}

async function disconnectDatabase() {
  await mongoose.disconnect()
}

module.exports = { connectDatabase, disconnectDatabase }
