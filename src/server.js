import dotenv from 'dotenv'
import { createServer } from 'node:http'
import app from './app.js'
import { connectDB } from './config/db.js'

dotenv.config()

const PORT = Number(process.env.PORT) || 5000

await connectDB()

createServer(app).listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
