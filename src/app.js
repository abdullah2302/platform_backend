import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import morgan from 'morgan'
import rateLimiter from './middleware/rateLimiter.js'
import errorHandler from './middleware/errorHandler.js'
import authRoutes from './routes/auth.routes.js'
import peopleRoutes from './routes/people.routes.js'
import searchRoutes from './routes/search.routes.js'
import taxonomyRoutes from './routes/taxonomy.routes.js'
import claimRoutes from './routes/claim.routes.js'
import serviceRoutes from './routes/service.routes.js'
import availabilityRoutes from './routes/availability.routes.js'
import inquiryRoutes from './routes/inquiry.routes.js'
import messageRoutes from './routes/message.routes.js'
import favoriteRoutes from './routes/favorite.routes.js'
import adminRoutes from './routes/admin.routes.js'
import reportRoutes from './routes/report.routes.js'

dotenv.config()

const app = express()
const allowedOrigins = process.env.CLIENT_ORIGIN ? [process.env.CLIENT_ORIGIN] : true

app.use(cors({ origin: allowedOrigins, credentials: true }))
app.use(express.json())
app.use(morgan('dev'))
app.use(rateLimiter())

app.get('/health', (req, res) => res.json({ success: true, data: { status: 'ok' } }))
app.use('/api/auth', authRoutes)
app.use('/api/people', peopleRoutes)
app.use('/api/search', searchRoutes)
app.use('/api/taxonomy', taxonomyRoutes)
app.use('/api/claims', claimRoutes)
app.use('/api/services', serviceRoutes)
app.use('/api/availability', availabilityRoutes)
app.use('/api/inquiries', inquiryRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/favorites', favoriteRoutes)
app.use('/api/admin', adminRoutes)
app.use('/api/reports', reportRoutes)
app.use(errorHandler)

export default app
