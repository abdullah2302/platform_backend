
import express from 'express'
import dotenv from 'dotenv'
import rateLimiter from './middleware/rateLimiter.js'
import errorHandler from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import peopleRoutes from './routes/people.routes.js'
import searchRoutes from './routes/search.routes.js'
import taxonomyRoutes from './routes/taxonomy.routes.js'
import { connectDB } from './config/db.js'
import { createServer } from 'node:http'
import cors from 'cors'
import morgan from 'morgan';

dotenv.config()


const app = express()
const httpServer = createServer(app)

const PORT = Number(process.env.PORT) || 5000
const allowedOrigins = [
  process.env.CLIENT_ORIGIN,
];
app.use(
    cors({
        origin: allowedOrigins,
        credentials: true,
    })
);
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimiter())

app.get('/health', (req, res) => {
  res.json({
    success: true,
    data: {
      status: 'ok'
    }
  })
})

app.use('/api/auth', authRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/taxonomy', taxonomyRoutes)

app.use(errorHandler)

await connectDB()

httpServer.listen(PORT, () => {
  console.log(`API running on http://localhost:${PORT}`)
})
