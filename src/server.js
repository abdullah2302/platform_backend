const app = require('./app')
const { connectDatabase } = require('./config/db')
const env = require('./config/env')
const { error: logError } = require('./utils/logger')

async function start() {
  await connectDatabase()
  app.listen(env.port, () => console.info(`Backend listening on port ${env.port}`))
}

if (require.main === module) {
  start().catch((error) => {
    logError('Unable to start backend', error)
    process.exitCode = 1
  })
}

module.exports = { start }
